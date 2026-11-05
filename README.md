# BugLens AI

Repo: https://github.com/lioleee/Buglens-ai

## Description

BugLens AI is a university project. The user types a bug description. The app shows an AI analysis of the bug. It also shows a list of previous reports.

This README is based on the frontend code. Backend and AI details are marked [TO BE CONFIRMED] where they are not known yet.

## Features

- Text box to enter a bug description.
- "Analyze Bug" button.
- Analysis result with:
  - Title
  - Category
  - Severity (colored badge)
  - Priority (colored badge)
  - Reproduction steps
  - Missing information
  - Suggestions
- List of previous reports.
- Error message if the text box is empty.
- "Clear" button.
- Ctrl+Enter (or Cmd+Enter) also submits the form.
- Small "Using mock data" note when mock mode is on.

## Technologies

| Part | Technology |
|------|------------|
| Frontend | HTML, CSS, JavaScript (plain, no frameworks) |
| Backend | Node.js, Express, MySQL |
| AI | [TO BE CONFIRMED] |

## Setup

### Frontend

1. Put `index.html`, `style.css` and `script.js` in one folder.
2. Open `index.html` in a browser.

No install step is needed for the frontend.

### Backend

The backend uses a `.env` file with these variable names:

```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
PORT
```

Set your own values. Do not commit the `.env` file.

Backend install and start commands: [TO BE CONFIRMED]

## Usage

1. Open the page.
2. Type a bug description in the text box.
3. Click "Analyze Bug".
4. Read the analysis below the text box.
5. See previous reports in the "Previous Reports" section.

If the text box is empty, the page shows an error message.

## Frontend notes

### USE_MOCK_DATA

At the top of `script.js` there is this setting:

```js
const USE_MOCK_DATA = true;
```

- `true`: the page uses fake sample data. No backend is needed. The "Using mock data" note is shown.
- `false`: the page calls the backend. The note is hidden.

In mock mode, the fake analysis picks the category and severity from a few simple keywords in the text. New fake reports are added to the list. They are lost when the page is reloaded.

### API endpoints

The frontend expects these endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/analyze` | Analyze a bug description |
| GET | `/api/reports` | Get previous reports |

**POST `/api/analyze`**

The page sends:

```json
{ "description": "..." }
```

The page expects:

```json
{
  "title": "string",
  "category": "string",
  "severity": "string",
  "priority": "string",
  "reproduction_steps": ["string"],
  "missing_information": ["string"],
  "suggestions": ["string"]
}
```

**GET `/api/reports`**

The page expects an array of:

```json
{
  "id": 1,
  "title": "string",
  "category": "string",
  "severity": "string",
  "priority": "string",
  "createdAt": "ISO date string"
}
```

The colored badges work with these values: Critical, Urgent, High, Medium, Low.

## Team roles

| Name | GitHub | Role |
|------|--------|------|
| Saiqa Shabbir | Saiqa-Capricon | Frontend |
| Sakina Mazhar | smk517 | Backend (Node.js, Express, MySQL) |
| Liba Tayyab | [lioleee | Testing((jest and supertest) |

## Limitations

- The frontend uses mock data right now.
- The frontend is not connected to the backend yet.
- The frontend is not connected to the AI yet.
- The analysis you see now is fake. It is not real AI output.
- Fake reports are not saved after a page reload.
- The API format above is what the frontend expects. The backend must match it.
