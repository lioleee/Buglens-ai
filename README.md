# BugLens AI – AI-Powered Bug Reporting and Analysis System

## 📌 Project Description
BugLens AI is an intelligent bug reporting and analysis web application designed to help developers seamlessly submit bug descriptions, automatically categorize them using smart severity logic, and track them via a centralized database dashboard.

## 🛠️ Technology Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS, Fetch API)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (`buglens_db`)
* **Version Control:** Git & GitHub (Feature branching & Pull Requests)
* **AI Tooling:** LLM-assisted development and structured prompt logging

---

## ⚙️ Setup & Installation Instructions

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/lioleee/Buglens-ai.git](https://github.com/lioleee/Buglens-ai.git)
   cd Buglens-ai
   Install Backend Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your MySQL configurations:

Code snippet
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=buglens_db
PORT=3000
Run the Application:

Bash
node server.js
Open your browser and navigate to http://localhost:3000.

🚀 Usage
Enter a bug description in the input form on the homepage.

The system automatically analyzes the bug, determines its severity/priority, and provides reproduction steps and suggestions.

Submitted reports are persisted in the MySQL database.

👥 Member Roles & Contributions
Sakina Mazhar: Backend architecture, Express server setup, MySQL database integration, dynamic severity logic, and API route debugging.

Teammate: Frontend UI design, HTML/CSS layouts, and client-side JavaScript integration.

📝 Prompt Log Summary
Our development process utilized AI-assisted planning and debugging. A detailed prompt log documenting our interactions, caught errors (such as HTTP 404 endpoint mismatches between /api/reports and /api/analyze), and final code fixes is maintained as part of our project evaluation record.