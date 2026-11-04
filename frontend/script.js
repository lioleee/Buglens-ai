// =====================================================
// BugLens AI - frontend script
// =====================================================

// Set to true to use fake sample data (no backend needed).
// Set to false when your teammate's backend is ready:
//   POST /api/analyze  -> analyze a bug description
//   GET  /api/reports  -> list previous reports
const USE_MOCK_DATA = true;

const API_ANALYZE_URL = "/api/analyze";
const API_REPORTS_URL = "/api/reports";

// ---------- DOM elements ----------
const bugInput = document.getElementById("bug-input");
const analyzeBtn = document.getElementById("analyze-btn");
const clearBtn = document.getElementById("clear-btn");
const errorMessage = document.getElementById("error-message");
const loading = document.getElementById("loading");
const mockNote = document.getElementById("mock-note");

const resultSection = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultCategory = document.getElementById("result-category");
const resultSeverity = document.getElementById("result-severity");
const resultPriority = document.getElementById("result-priority");
const resultSteps = document.getElementById("result-steps");
const resultMissing = document.getElementById("result-missing");
const resultSuggestions = document.getElementById("result-suggestions");

const reportsList = document.getElementById("reports-list");
const reportsEmpty = document.getElementById("reports-empty");

// ---------- Fake sample data ----------
// Shape of the data the backend should return:
//
// POST /api/analyze  ->  {
//   title, category, severity, priority,
//   reproduction_steps: [string],
//   missing_information: [string],
//   suggestions: [string]
// }
//
// GET /api/reports   ->  [ { id, title, category, severity, priority, createdAt }, ... ]

const mockReports = [
  {
    id: 1,
    title: "Login button unresponsive on mobile",
    category: "UI",
    severity: "High",
    priority: "High",
    createdAt: "2026-11-01T09:30:00Z"
  },
  {
    id: 2,
    title: "Checkout total shows wrong amount",
    category: "Functional",
    severity: "Critical",
    priority: "Urgent",
    createdAt: "2026-11-02T14:10:00Z"
  },
  {
    id: 3,
    title: "Profile page loads slowly",
    category: "Performance",
    severity: "Medium",
    priority: "Medium",
    createdAt: "2026-11-03T11:45:00Z"
  },
  {
    id: 4,
    title: "Typo in footer copyright text",
    category: "UI",
    severity: "Low",
    priority: "Low",
    createdAt: "2026-11-03T16:20:00Z"
  }
];

function mockAnalyze(description) {
  const text = description.toLowerCase();

  // Pick a category and severity based on a few simple keywords
  let category = "Functional";
  let severity = "Medium";
  let priority = "Medium";

  if (/crash|freeze|frozen|data loss|security|payment|cannot log/.test(text)) {
    severity = "Critical";
    priority = "Urgent";
  } else if (/error|fail|broken|not working|doesn't work|does not work/.test(text)) {
    severity = "High";
    priority = "High";
  } else if (/typo|color|colour|alignment|spacing|font/.test(text)) {
    category = "UI";
    severity = "Low";
    priority = "Low";
  }

  if (/slow|lag|loading|performance|timeout/.test(text)) {
    category = "Performance";
  } else if (/button|layout|screen|page|display|mobile/.test(text) && severity !== "Low") {
    category = "UI";
  }

  const shortText = description.trim().slice(0, 60);
  const title = shortText.length < description.trim().length ? shortText + "..." : shortText;

  return {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    category: category,
    severity: severity,
    priority: priority,
    reproduction_steps: [
      "Open the application in a supported browser.",
      "Navigate to the page or feature mentioned in the report.",
      "Perform the action described by the user.",
      "Observe the unexpected behavior."
    ],
    missing_information: [
      "Browser name and version",
      "Operating system / device",
      "Exact error message or screenshot",
      "How often the bug happens (always or sometimes)"
    ],
    suggestions: [
      "Check the browser console for JavaScript errors.",
      "Try to reproduce the bug in a different browser.",
      "Add logging around the affected feature.",
      "Write a test case once the cause is found."
    ]
  };
}

// ---------- API helpers ----------
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function analyzeBug(description) {
  if (USE_MOCK_DATA) {
    await delay(800); // pretend the server is thinking
    const result = mockAnalyze(description);

    // Add the new report to the top of the fake list
    mockReports.unshift({
      id: Date.now(),
      title: result.title,
      category: result.category,
      severity: result.severity,
      priority: result.priority,
      createdAt: new Date().toISOString()
    });

    return result;
  }

  const response = await fetch(API_ANALYZE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: description })
  });

  if (!response.ok) {
    throw new Error("Server returned status " + response.status);
  }
  return response.json();
}

async function fetchReports() {
  if (USE_MOCK_DATA) {
    await delay(300);
    return mockReports.slice();
  }

  const response = await fetch(API_REPORTS_URL);
  if (!response.ok) {
    throw new Error("Server returned status " + response.status);
  }
  return response.json();
}

// ---------- UI helpers ----------
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  bugInput.classList.add("invalid");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
  bugInput.classList.remove("invalid");
}

function setLoading(isLoading) {
  loading.hidden = !isLoading;
  analyzeBtn.disabled = isLoading;
  analyzeBtn.textContent = isLoading ? "Analyzing..." : "Analyze Bug";
}

// Fill a <ul> or <ol> with text items (textContent keeps it safe from HTML injection)
function fillList(listElement, items) {
  listElement.innerHTML = "";
  (items || []).forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

// Give the severity/priority badge a color class
function levelClass(value) {
  const v = String(value || "").toLowerCase();
  if (v === "critical" || v === "urgent") return "critical";
  if (v === "high") return "high";
  if (v === "medium") return "medium";
  if (v === "low") return "low";
  return "";
}

function setBadge(element, value) {
  element.textContent = value || "N/A";
  element.className = "badge " + levelClass(value);
}

function showResult(data) {
  resultTitle.textContent = data.title || "Untitled bug";
  resultCategory.textContent = data.category || "N/A";
  setBadge(resultSeverity, data.severity);
  setBadge(resultPriority, data.priority);

  fillList(resultSteps, data.reproduction_steps);
  fillList(resultMissing, data.missing_information);
  fillList(resultSuggestions, data.suggestions);

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatDate(isoString) {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function renderReports(reports) {
  reportsList.innerHTML = "";

  if (!reports || reports.length === 0) {
    reportsEmpty.hidden = false;
    return;
  }
  reportsEmpty.hidden = true;

  reports.forEach(function (report) {
    const li = document.createElement("li");
    li.className = "report-item";

    const info = document.createElement("div");
    info.className = "report-info";

    const title = document.createElement("p");
    title.className = "report-title";
    title.textContent = report.title;

    const meta = document.createElement("p");
    meta.className = "report-meta";
    meta.textContent = report.category + " \u00B7 " + formatDate(report.createdAt);

    info.appendChild(title);
    info.appendChild(meta);

    const badge = document.createElement("span");
    badge.className = "badge " + levelClass(report.severity);
    badge.textContent = report.severity;

    li.appendChild(info);
    li.appendChild(badge);
    reportsList.appendChild(li);
  });
}

async function loadReports() {
  try {
    const reports = await fetchReports();
    renderReports(reports);
  } catch (err) {
    reportsList.innerHTML = "";
    reportsEmpty.textContent = "Could not load previous reports.";
    reportsEmpty.hidden = false;
    console.error(err);
  }
}

// ---------- Event handlers ----------
async function handleAnalyze() {
  const description = bugInput.value.trim();

  // Validation: empty text box
  if (description === "") {
    showError("Please enter a bug description before clicking Analyze Bug.");
    bugInput.focus();
    return;
  }

  clearError();
  resultSection.hidden = true;
  setLoading(true);

  try {
    const data = await analyzeBug(description);
    showResult(data);
    loadReports(); // refresh the list so the new report appears
  } catch (err) {
    showError("Something went wrong while analyzing the bug. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
}

function handleClear() {
  bugInput.value = "";
  clearError();
  resultSection.hidden = true;
  bugInput.focus();
}

analyzeBtn.addEventListener("click", handleAnalyze);
clearBtn.addEventListener("click", handleClear);

// Hide the error as soon as the user starts typing
bugInput.addEventListener("input", function () {
  if (!errorMessage.hidden) {
    clearError();
  }
});

// Ctrl+Enter (or Cmd+Enter) submits
bugInput.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    handleAnalyze();
  }
});

// Show the "Using mock data" note only when mock mode is on
mockNote.hidden = !USE_MOCK_DATA;

// Load the list of previous reports when the page opens
loadReports();