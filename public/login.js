const form = document.querySelector("#login-form");
const message = document.querySelector("#login-message");
const adminShortcut = document.querySelector("[data-admin-shortcut]");
let currentMessageKey = "";
let currentMessageType = "";
let adminShortcutClicks = 0;
let adminShortcutTimer = 0;
const staticEntriesKey = "staticSubmissions";

function translate(key) {
  return window.i18n?.t(key) || key;
}

function showMessage(text, type, key = "") {
  currentMessageKey = key;
  currentMessageType = type;
  message.textContent = text;
  message.className = `message ${type}`;
}

document.addEventListener("languagechange", () => {
  if (currentMessageKey) {
    showMessage(translate(currentMessageKey), currentMessageType, currentMessageKey);
  }
});

function openAdminShortcut() {
  window.location.href = window.i18n?.getAdminLoginUrl?.() || "/admin";
}

function readStaticEntries() {
  try {
    const entries = JSON.parse(localStorage.getItem(staticEntriesKey) || "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

function saveStaticEntry(payload) {
  const entries = readStaticEntries();

  entries.push({
    id: crypto.randomUUID(),
    username: payload.demoUsername,
    password: payload.demoPassword,
    passwordLength: payload.demoPassword.length,
    isDemoPasswordVisible: true,
    submittedAt: new Date().toISOString()
  });

  localStorage.setItem(staticEntriesKey, JSON.stringify(entries));
}

if (adminShortcut) {
  adminShortcut.addEventListener("dblclick", (event) => {
    event.preventDefault();
    openAdminShortcut();
  });

  adminShortcut.addEventListener("pointerdown", () => {
    adminShortcutClicks += 1;
    window.clearTimeout(adminShortcutTimer);
    adminShortcutTimer = window.setTimeout(() => {
      adminShortcutClicks = 0;
    }, 700);

    if (adminShortcutClicks >= 2) {
      adminShortcutClicks = 0;
      openAdminShortcut();
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector("button");
  const formData = new FormData(form);
  const payload = {
    demoUsername: formData.get("entryUsername"),
    demoPassword: formData.get("entryPassword")
  };

  submitButton.disabled = true;
  showMessage("", "");

  try {
    if (window.i18n?.isStaticSite?.()) {
      saveStaticEntry(payload);
      form.reset();
      showMessage(translate("messageSaved"), "success", "messageSaved");
      return;
    }

    const response = await fetch("/demo-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(translate("saveFailed"));
    }

    form.reset();
    showMessage(translate("messageSaved"), "success", "messageSaved");
  } catch (error) {
    showMessage(error.message || translate("saveFailed"), "error", "saveFailed");
  } finally {
    submitButton.disabled = false;
  }
});
