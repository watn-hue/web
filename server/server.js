const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const projectDir = path.join(__dirname, "..");
const publicDir = path.join(projectDir, "public");
const dataDir = path.join(projectDir, "data");
const loginFile = path.join(dataDir, "submissions.json");
const oldLoginFile = path.join(__dirname, "data", "logins.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`scrypt:${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(loginFile);
  } catch {
    try {
      await fs.copyFile(oldLoginFile, loginFile);
    } catch {
      await fs.writeFile(loginFile, "[]\n", "utf8");
    }
  }
}

async function readLoginEntries() {
  await ensureDataFile();
  const fileContents = await fs.readFile(loginFile, "utf8");
  const entries = JSON.parse(fileContents);

  return Array.isArray(entries) ? entries : [];
}

async function writeLoginEntries(entries) {
  await ensureDataFile();

  const temporaryFile = `${loginFile}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  await fs.rename(temporaryFile, loginFile);
}

function wantsHtml(req) {
  const acceptHeader = req.headers.accept || "";

  return acceptHeader.includes("text/html") && !acceptHeader.includes("application/json");
}

function toAdminRow(entry) {
  return {
    id: entry.id,
    username: entry.username,
    password: entry.demoPassword || "Saved securely",
    passwordLength: entry.passwordLength,
    isDemoPasswordVisible: Boolean(entry.demoPassword),
    submittedAt: entry.submittedAt
  };
}

function getStorageInfo() {
  return {
    file: path.relative(projectDir, loginFile).replace(/\\/g, "/")
  };
}

app.post("/login", async (req, res) => {
  const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  if (username.length > 120 || password.length > 200) {
    res.status(400).json({ error: "Username or password is too long." });
    return;
  }

  try {
    const entries = await readLoginEntries();
    const newEntry = {
      id: crypto.randomUUID(),
      username,
      passwordHash: await hashPassword(password),
      passwordLength: password.length,
      submittedAt: new Date().toISOString()
    };

    entries.push(newEntry);
    await writeLoginEntries(entries);

    res.status(201).json({ message: "Information saved." });
  } catch (error) {
    console.error("Unable to save login submission:", error);
    res.status(500).json({ error: "Unable to save information." });
  }
});

app.post("/demo-submit", async (req, res) => {
  const username =
    typeof req.body.demoUsername === "string" ? req.body.demoUsername.trim() : "";
  const demoPassword =
    typeof req.body.demoPassword === "string" ? req.body.demoPassword : "";

  if (!username || !demoPassword) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  if (username.length > 120 || demoPassword.length > 200) {
    res.status(400).json({ error: "Username or password is too long." });
    return;
  }

  try {
    const entries = await readLoginEntries();
    const newEntry = {
      id: crypto.randomUUID(),
      username,
      demoPassword,
      passwordLength: demoPassword.length,
      submittedAt: new Date().toISOString(),
      type: "demo"
    };

    entries.push(newEntry);
    await writeLoginEntries(entries);

    res.status(201).json({ message: "Information saved." });
  } catch (error) {
    console.error("Unable to save submission:", error);
    res.status(500).json({ error: "Unable to save information." });
  }
});

app.post("/admin/login", (req, res) => {
  res.json({ message: "Admin opened." });
});

app.post("/admin/logout", (req, res) => {
  res.json({ message: "Done." });
});

app.get("/admin", async (req, res) => {
  if (wantsHtml(req)) {
    res.sendFile(path.join(publicDir, "admin.html"));
    return;
  }

  try {
    const entries = await readLoginEntries();
    res.json({
      entries: entries.map(toAdminRow).reverse(),
      storage: getStorageInfo()
    });
  } catch (error) {
    console.error("Unable to load login submissions:", error);
    res.status(500).json({ error: "Unable to load information." });
  }
});

app.delete("/admin", async (req, res) => {
  try {
    await writeLoginEntries([]);
    res.json({ message: "All information was deleted." });
  } catch (error) {
    console.error("Unable to delete login submissions:", error);
    res.status(500).json({ error: "Unable to delete information." });
  }
});

app.get("/admin-login.html", (req, res) => {
  res.redirect("/admin");
});

app.get("/admin.html", (req, res) => {
  res.redirect("/admin");
});

app.use(express.static(publicDir));

async function startServer() {
  try {
    await ensureDataFile();

    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
      console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
      console.log(`Data file: ${path.relative(projectDir, loginFile)}`);
    });
  } catch (error) {
    console.error("Unable to prepare data storage:", error);
    process.exit(1);
  }
}

startServer();
