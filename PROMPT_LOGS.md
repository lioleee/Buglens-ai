# BugLens AI - AI-Assisted Development Prompt Logs

This document records the interaction prompts, iterative debugging steps, and generated solutions utilized during the development of BugLens AI.

---

### Log 1: Frontend Branch Recovery & Conflict Resolution
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