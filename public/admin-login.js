const form = document.querySelector("#admin-login-form");
const message = document.querySelector("#admin-login-message");
const savedValueFields = document.querySelectorAll("[data-clear-on-load]");
let currentMessageKey = "";
let currentMessageType = "";

function translate(key) {
  return window.i18n?.t(key) || key;
}

function clearSavedFieldValues() {
  savedValueFields.forEach((field) => {
    if (document.activeElement !== field) {
      field.value = "";
    }
  });
}

clearSavedFieldValues();
setTimeout(clearSavedFieldValues, 100);
setTimeout(clearSavedFieldValues, 400);

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector("button");
  const formData = new FormData(form);
  const payload = {
    password: formData.get("adminLoginSecret")
  };

  submitButton.disabled = true;
  showMessage("", "");

  try {
    const response = await fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(translate("signInFailed"));
    }

    window.location.href = "/admin";
  } catch (error) {
    showMessage(error.message || translate("signInFailed"), "error", "signInFailed");
  } finally {
    submitButton.disabled = false;
  }
});
