(function () {
  const translations = {
    ar: {
      adminLink: "\u0627\u0644\u0623\u062f\u0645\u0646",
      adminLoginTitle: "\u062f\u062e\u0648\u0644 \u0627\u0644\u0623\u062f\u0645\u0646",
      adminMark: "\u0623",
      adminPasswordHelper: "\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0627\u0644\u0623\u062f\u0645\u0646.",
      adminPanel: "\u0644\u0648\u062d\u0629 \u0627\u0644\u0623\u062f\u0645\u0646",
      adminUsernameLabel: "\u0627\u0633\u0645 \u0627\u0644\u062f\u062e\u0648\u0644",
      clearAll: "\u0645\u0633\u062d \u0627\u0644\u0643\u0644",
      confirmClear: "\u0647\u0644 \u062a\u0631\u064a\u062f \u0645\u0633\u062d \u0643\u0644 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629\u061f",
      dashboardTitle: "\u0644\u0648\u062d\u0629 \u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a",
      deleteFailed: "\u062a\u0639\u0630\u0631 \u0645\u0633\u062d \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a.",
      entryHelper: "\u0627\u0643\u062a\u0628 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062b\u0645 \u0627\u0636\u063a\u0637 \u062d\u0641\u0638.",
      entryPageLink: "\u0635\u0641\u062d\u0629 \u0627\u0644\u0625\u062f\u062e\u0627\u0644",
      entryTitle: "\u0625\u062f\u062e\u0627\u0644 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a",
      languageNext: "English",
      latestEntry: "\u0622\u062e\u0631 \u0625\u062f\u062e\u0627\u0644",
      lengthLabel: "\u0627\u0644\u0637\u0648\u0644",
      loadingEntries: "\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0633\u062c\u0644\u0627\u062a...",
      loadFailed: "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0633\u062c\u0644\u0627\u062a.",
      logout: "\u062e\u0631\u0648\u062c",
      messageSaved: "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a.",
      noEntries: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0645\u062d\u0641\u0648\u0638\u0629 \u062d\u0627\u0644\u064a\u0627.",
      none: "\u0644\u0627 \u064a\u0648\u062c\u062f",
      openDashboard: "\u0641\u062a\u062d \u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a",
      passwordLabel: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      passwordPlaceholder: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      records: "\u0627\u0644\u0633\u062c\u0644\u0627\u062a",
      refresh: "\u062a\u062d\u062f\u064a\u062b",
      saveFailed: "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a.",
      saveInfo: "\u062d\u0641\u0638",
      savedEntries: "\u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0627\u062a",
      secureSaved: "\u0645\u062d\u0641\u0648\u0638\u0629 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",
      signInFailed: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629.",
      storageFile: "\u0645\u0643\u0627\u0646 \u0627\u0644\u062d\u0641\u0638",
      storageSubtitle: "\u0648\u0627\u062c\u0647\u0629 \u0628\u0633\u064a\u0637\u0629 \u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629.",
      storageTitle: "\u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a",
      submittedLabel: "\u0648\u0642\u062a \u0627\u0644\u062d\u0641\u0638",
      unavailable: "\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631",
      usernameLabel: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
      usernamePlaceholder: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645"
    },
    en: {
      adminLink: "Admin",
      adminLoginTitle: "Admin Login",
      adminMark: "A",
      adminPasswordHelper: "Enter the admin password.",
      adminPanel: "Admin Panel",
      adminUsernameLabel: "Username",
      clearAll: "Clear All",
      confirmClear: "Delete all saved information?",
      dashboardTitle: "Information Storage",
      deleteFailed: "Unable to delete information.",
      entryHelper: "Enter the details, then save.",
      entryPageLink: "Entry Page",
      entryTitle: "Information Entry",
      languageNext: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
      latestEntry: "Latest Entry",
      lengthLabel: "Length",
      loadingEntries: "Loading records...",
      loadFailed: "Unable to load records.",
      logout: "Logout",
      messageSaved: "Information saved.",
      noEntries: "No saved information yet.",
      none: "None",
      openDashboard: "Open Dashboard",
      passwordLabel: "Password",
      passwordPlaceholder: "Password",
      records: "Records",
      refresh: "Refresh",
      saveFailed: "Unable to save information.",
      saveInfo: "Save",
      savedEntries: "Saved Entries",
      secureSaved: "Saved securely",
      signInFailed: "Invalid password.",
      storageFile: "Storage File",
      storageSubtitle: "A simple place to review saved information.",
      storageTitle: "Information Storage",
      submittedLabel: "Saved At",
      unavailable: "Unavailable",
      usernameLabel: "Username",
      usernamePlaceholder: "Username"
    }
  };

  const languageKey = "appLanguageV2";
  const validLanguages = new Set(["ar", "en"]);
  const staticAdminSessionKey = "staticAdminUnlocked";
  let arabicAdminClickCount = 0;
  let arabicAdminClickTimer = 0;

  function isStaticSite() {
    return window.location.hostname.endsWith("github.io");
  }

  function getAdminLoginUrl() {
    return isStaticSite() ? "admin-login.html" : "/admin";
  }

  function getLanguage() {
    const savedLanguage = localStorage.getItem(languageKey);
    return validLanguages.has(savedLanguage) ? savedLanguage : "en";
  }

  function t(key) {
    const language = getLanguage();
    return translations[language][key] || translations.en[key] || key;
  }

  function formatDate(isoDate) {
    const language = getLanguage();
    const locale = language === "ar" ? "ar-SY" : "en-US";

    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "medium"
    }).format(new Date(isoDate));
  }

  function formatLength(length) {
    const safeLength = Number.isInteger(length) && length > 0 ? length : 0;

    if (!safeLength) {
      return t("unavailable");
    }

    return getLanguage() === "ar" ? `${safeLength} \u062d\u0631\u0641` : `${safeLength} characters`;
  }

  function applyLanguage() {
    const language = getLanguage();
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-title-key]").forEach((element) => {
      element.textContent = t(element.dataset.titleKey);
    });

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.textContent = t("languageNext");
      button.setAttribute("aria-label", t("languageNext"));
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      const isActive = button.dataset.languageOption === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLanguage(language) {
    if (!validLanguages.has(language)) {
      return;
    }

    if (language === getLanguage()) {
      return;
    }

    localStorage.setItem(languageKey, language);
    applyLanguage();
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { language } }));
  }

  function toggleLanguage() {
    setLanguage(getLanguage() === "ar" ? "en" : "ar");
  }

  window.i18n = {
    applyLanguage,
    formatDate,
    formatLength,
    getAdminLoginUrl,
    getLanguage,
    isStaticSite,
    setLanguage,
    staticAdminSessionKey,
    t,
    toggleLanguage
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.addEventListener("click", toggleLanguage);
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      const chooseLanguage = () => {
        const selectedLanguage = button.dataset.languageOption;

        if (document.body.hasAttribute("data-admin-trigger") && selectedLanguage === "ar") {
          arabicAdminClickCount += 1;
          window.clearTimeout(arabicAdminClickTimer);
          arabicAdminClickTimer = window.setTimeout(() => {
            arabicAdminClickCount = 0;
          }, 6000);

          if (arabicAdminClickCount >= 4) {
            arabicAdminClickCount = 0;
            window.location.href = getAdminLoginUrl();
            return;
          }
        }

        setLanguage(selectedLanguage);
      };

      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        chooseLanguage();
      });

      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          chooseLanguage();
        }
      });
    });
  });
})();
