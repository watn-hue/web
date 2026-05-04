const entriesBody = document.querySelector("#entries-body");
const entryCount = document.querySelector("#entry-count");
const entryTotal = document.querySelector("#entry-total");
const latestEntry = document.querySelector("#latest-entry");
const storagePath = document.querySelector("#storage-path");
const refreshButton = document.querySelector("#refresh-button");
const clearButton = document.querySelector("#clear-button");
const logoutButton = document.querySelector("#logout-button");

let currentEntries = [];
let hasLoadedEntries = false;

function translate(key) {
  return window.i18n?.t(key) || key;
}

function formatDate(isoDate) {
  return window.i18n?.formatDate(isoDate) || new Date(isoDate).toLocaleString();
}

function formatLength(length) {
  return window.i18n?.formatLength(length) || `${length} characters`;
}

function renderEntries(entries) {
  currentEntries = entries;
  hasLoadedEntries = true;
  entryCount.textContent = entries.length;
  entryTotal.textContent = entries.length;
  latestEntry.textContent = entries.length ? formatDate(entries[0].submittedAt) : translate("none");
  clearButton.disabled = entries.length === 0;

  if (!entries.length) {
    renderTableMessage(translate("noEntries"));
    return;
  }

  entriesBody.replaceChildren(
    ...entries.map((entry) => {
      const row = document.createElement("tr");
      const usernameCell = document.createElement("td");
      const passwordStatusCell = document.createElement("td");
      const passwordLengthCell = document.createElement("td");
      const submittedCell = document.createElement("td");

      usernameCell.textContent = entry.username;
      passwordStatusCell.textContent = entry.isDemoPasswordVisible
        ? entry.password
        : translate("secureSaved");
      passwordStatusCell.className = entry.isDemoPasswordVisible ? "demo-password-cell" : "muted-cell";
      passwordLengthCell.textContent = formatLength(entry.passwordLength);
      submittedCell.textContent = formatDate(entry.submittedAt);

      row.append(usernameCell, passwordStatusCell, passwordLengthCell, submittedCell);
      return row;
    })
  );
}

function renderTableMessage(text) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 4;
  cell.className = "empty-cell";
  cell.textContent = text;
  row.append(cell);
  entriesBody.replaceChildren(row);
}

async function loadEntries() {
  refreshButton.disabled = true;

  try {
    const response = await fetch("/admin", {
      headers: {
        Accept: "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = "/admin-login.html";
      return;
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(translate("loadFailed"));
    }

    storagePath.textContent = result.storage?.file || "data/submissions.json";
    renderEntries(result.entries);
  } catch (error) {
    hasLoadedEntries = false;
    renderTableMessage(error.message || translate("loadFailed"));
  } finally {
    refreshButton.disabled = false;
  }
}

async function clearEntries() {
  const confirmed = window.confirm(translate("confirmClear"));

  if (!confirmed) {
    return;
  }

  clearButton.disabled = true;

  try {
    const response = await fetch("/admin", {
      method: "DELETE"
    });

    if (response.status === 401) {
      window.location.href = "/admin-login.html";
      return;
    }

    if (!response.ok) {
      throw new Error(translate("deleteFailed"));
    }

    renderEntries([]);
  } catch (error) {
    renderTableMessage(error.message || translate("deleteFailed"));
  }
}

document.addEventListener("languagechange", () => {
  if (hasLoadedEntries) {
    renderEntries(currentEntries);
  } else {
    renderTableMessage(translate("loadingEntries"));
  }
});

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await fetch("/admin/logout", { method: "POST" });
    window.location.href = "/admin-login.html";
  });
}

clearButton.addEventListener("click", clearEntries);
refreshButton.addEventListener("click", loadEntries);

loadEntries();
