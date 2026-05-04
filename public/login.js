const form = document.querySelector("#login-form");
const message = document.querySelector("#login-message");
const adminEntryLink = document.querySelector("[data-admin-entry]");
let currentMessageKey = "";
let currentMessageType = "";
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

function openAdminPage() {
  window.location.href = window.i18n?.isStaticSite?.() ? "admin.html" : "/admin";
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

if (adminEntryLink) {
  adminEntryLink.addEventListener("click", (event) => {
    event.preventDefault();
    openAdminPage();
  });

  adminEntryLink.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAdminPage();
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
