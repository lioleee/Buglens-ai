# BugLens AI - AI-Assisted Development Prompt Logs

This document records the interaction prompts, iterative debugging steps, and generated solutions utilized during the development of BugLens AI.

---
# Prompt Log - Saiqa Shabbir (Frontend)

AI used: Claude (Anthropic). I used one Claude chat to generate the frontend code, and another Claude chat to guide me with Git steps and review my code.

## Entry 1 - Frontend (HTML, CSS, JavaScript)

**Prompt:**
I'm making a project called BugLens AI for my university assignment. I'm doing the frontend part only. Please make it using plain HTML, CSS and JavaScript in 3 files (index.html, style.css, script.js).

The user types a bug description in a text box and clicks "Analyze Bug". The page then shows the AI analysis: title, category, severity, priority, reproduction steps, missing information and suggestions. There should also be a list of previous reports.

My teammate is making the backend, so for now please use some fake sample data so I can test the page. The backend will have POST /api/analyze and GET /api/reports.

Keep the design simple and clean, and show an error message if the text box is empty.

**What the AI gave:** index.html (form, result card, previous reports list), style.css and script.js (form logic, result card, history list, fake sample data). It also added a Clear button that I did not ask for.

**What the AI got wrong:**
1. It used the names reproductionSteps and missingInformation (camelCase). Our group plan uses reproduction_steps and missing_information (snake_case). My prompt did not give the field names, so the AI guessed. With the real backend, these two lists would have shown up empty with no error message.
2. The page did not say that the data was fake. In a demo, the sample results could look like real AI results.

**How I found it:** I reviewed the code with the second Claude chat before connecting to the backend. I also tested the page in the browser: empty input shows an error, the result card shows, the history list shows and the Clear button works.

**What I did:** I saved the files in the frontend folder, committed them and sent a second prompt to fix the two problems.

## Entry 2 - Fixes

**Prompt:**
Please make two small changes to my frontend:

1. In script.js, my code uses "reproductionSteps" and "missingInformation". Please change them to "reproduction_steps" and "missing_information" everywhere, including in the fake sample data.
2. Show a small visible note on the page that says "Using mock data" when USE_MOCK_DATA is true. Hide it when it is false.

Please give me the full updated files that changed (script.js, and index.html or style.css if you changed them).

**What the AI gave:** Updated script.js, index.html and style.css.

**Result:** The "Using mock data" note shows on the page and all 3 lists (Reproduction Steps, Missing Information, Suggestions) are full.

## My own mistake (not the AI's)

My first commit of script.js was empty (0 insertions) because I committed before saving the code. I saw this with `git show --stat` and fixed it with a new commit. Now I check `git status` before and `git show --stat` after every commit.

## Limitations
- The frontend uses mock data. It is not connected to the real backend yet.
- The field names still need to be confirmed with the backend teammate.

### Log 1: Frontend Branch Recovery & Conflict Resolution(sakina)
* **Objective:** Recover missing frontend files from the `feature/frontend` branch after a Git stash conflict involving `server.js`.
* **Prompt / Query:** 
  > *"I switched to feature/frontend branch and got a conflict: error: Your local changes to the following files would be overwritten by checkout: server.js. How do I resolve this using git stash and safely merge my files?"*
* **AI Assistance / Solution:**
  * Guided through `git stash`, switching branches, and handling the `modify/delete` conflict for `server.js`.
  * Provided steps to stage `server.js`, drop the stash, and verify branch status.
* **Outcome:** Frontend directory (`index.html`, `script.js`, `style.css`) and backend `server.js` successfully unified on the `feature/frontend` branch.

---

### Log 2: MySQL Database Configuration & Connection Troubleshooting
* **Objective:** Fix a database connection access denied error (`Access denied for user ''@'localhost'`) in the Node.js/Express backend.
* **Prompt / Query:** 
  > *"Node server started but showing: Database connection failed: Access denied for user ''@'localhost' (using password: YES). How do I fix this?"*
* **AI Assistance / Solution:**
  * Identified that the `.env` file was missing or environment variables were not loading (`injected env (0)`).
  * Outlined the correct environment configuration structure (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`).
* **Outcome:** Created the `.env` file with local MySQL credentials, ensuring successful execution of `mysql2` connection pool/connection code in `server.js`.

---

### Log 3: Frontend-Backend API Integration & Verification
* **Objective:** Ensure the frontend interacts with backend API endpoints (`/api/analyze`, `/api/reports`) instead of mock data.
* **Prompt / Query:** 
  > *"The UI is showing 'Using mock data'. How do I connect the frontend script with `/api/analyze` and `/api/reports`?"*
* **AI Assistance / Solution:**
  * Configured relative API path constants (`API_ANALYZE_URL`, `API_REPORTS_URL`) in `script.js`.
  * Verified database reflection using MySQL Workbench (`SELECT * FROM reports;`) and browser route testing (`/reports`).
* **Outcome:** Seamless data flow achieved between the Express backend, MySQL database, and frontend UI.
