# BugLens AI – Manual Test Cases

## TC-001: Backend Server Startup

**Description:** Verify that the backend server starts successfully.

**Preconditions:**
- Node.js is installed.
- Backend project is available.

**Test Steps:**
1. Open VS Code terminal.
2. Navigate to the project folder.
3. Run `node server.js`.
4. Observe the terminal output.

**Test Data:** Valid project configuration.

**Expected Result:** Server starts and displays a successful startup message.

**Actual Result:** Pending execution.

**Status:** Not Executed
### Database Connection Investigation

**Observation:** The backend server starts successfully on port 3000, but the MySQL connection fails.

**Investigation:** MySQL Server is not installed on my computer. My backend teammate confirmed that the project uses a local MySQL database.

**Current Status:** Database setup is pending.

**Next Action:** Continue QA preparation while coordinating database setup with the backend teammate.

## Automated Test – Jest Setup

**Test:** Verify Jest is working  
**Expected Result:** Jest runs a test successfully  
**Actual Result:** 1 test passed  
**Status:** Passed


## TC-002: Unknown Route Response

**Description:** Verify Express returns 404 for an unknown route.

**Expected Result:** HTTP 404 response.

**Actual Result:** Express returned 404 as expected.

**Status:** Passed

**Note:** MySQL connection error appeared during testing but did not fail this test.



## Jest Coverage Report

**Test Run:** npm test -- --coverage

- Statements: 76.47%
- Branches: 33.33%
- Functions: 50%
- Lines: 76.47%

**Observation:** Some backend code remains untested. MySQL connection errors appear during testing.

**Status:** Coverage report generated successfully.

## Additional Automated Tests – Backend API Testing

**Test Run:** `npm test -- --coverage`

**Testing Framework:** Jest and Supertest

**Test Cases Added:**

### TC-003: CORS Middleware Verification

**Description:** Verify that the backend allows cross-origin requests.

**Expected Result:** Response contains the `Access-Control-Allow-Origin: *` header.

**Actual Result:** CORS header was returned as expected.

**Status:** Passed

### TC-004: Invalid JSON Request

**Description:** Verify that the backend handles malformed JSON requests.

**Expected Result:** Server returns HTTP 400 for invalid JSON input.

**Actual Result:** HTTP 400 response received as expected.

**Status:** Passed

### TC-005: Unknown POST Route Response

**Description:** Verify that Express returns 404 for an unknown POST route.

**Expected Result:** HTTP 404 response.

**Actual Result:** Express returned HTTP 404 as expected.

**Status:** Passed

### TC-006: Unknown GET Route Response

**Description:** Verify that Express returns 404 for an unknown GET route.

**Expected Result:** HTTP 404 response.

**Actual Result:** Express returned HTTP 404 as expected.

**Status:** Passed

## Testing Dependencies Installation

**Observation:** During QA setup, Jest and Supertest dependencies were missing from the project.

**Investigation:** Jest was not recognized after installing `jest-environment-jsdom`, and the test execution also reported that the `supertest` module was missing.

**Corrective Actions:**
- Installed Jest as a development dependency.
- Installed Supertest as a development dependency.
- Verified the automated testing environment.

**Actual Result:** Automated tests executed successfully after installing the missing dependencies.

**Status:** Resolved


## Frontend Manual Testing – BugLens AI

### TC-007: Browser Console Error Verification

**Description:** Verify that the frontend does not display JavaScript errors in the browser console.

**Test Steps:**
1. Open BugLens AI in the browser.
2. Press F12 to open Developer Tools.
3. Select the Console tab.
4. Check for red error messages.

**Expected Result:** No JavaScript errors should appear in the browser console.

**Actual Result:** No visible errors were observed.

**Status:** Passed

### TC-008: Responsive Design Testing

**Description:** Verify that the frontend interface displays correctly in mobile view.

**Test Steps:**
1. Open browser Developer Tools.
2. Enable device emulation.
3. Select a mobile device size.
4. Check the description box, buttons and Previous Reports section.

**Expected Result:** Interface elements should display correctly without overlapping or being cut off.

**Actual Result:** Frontend displayed correctly in mobile view. No visible layout issues were observed.

**Status:** Passed

### TC-009: Empty Input Validation

**Description:** Verify that the application prevents users from submitting an empty bug description.

**Test Steps:**
1. Open BugLens AI.
2. Leave the description box empty.
3. Click Analyze Bug.

**Expected Result:** Application displays an error or validation message.

**Actual Result:** An error message appeared when submitting an empty description.

**Status:** Passed