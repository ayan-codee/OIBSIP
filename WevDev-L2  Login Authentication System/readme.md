# Client-Side Authentication System 

A secure, front-end only Single Page Application (SPA) that simulates a complete user authentication flow. Built with Vanilla JavaScript, it leverages `localStorage` for user data persistence and `sessionStorage` for active session management.

## Features

All internship requirements and additional edge cases have been successfully implemented:

- [x] **Registration & Login:** Clean, responsive forms for user sign-up and sign-in.
- [x] **Advanced Validation:** - Prevents empty form submissions.
  - Validates email formatting (ensures proper structure if `@` is included).
  - Password strength enforcement (Minimum 8 characters AND at least 1 number).
- [x] **Duplicate Checking:** Verifies existing users in the database to prevent duplicate usernames/emails.
- [x] **Secure Error Handling:** Displays generic error messages on login failure ("Invalid username or password") to prevent credential guessing.
- [x] **Protected Dashboard:** A restricted view that can only be accessed with a valid session.
- [x] **Session Management:** Uses `sessionStorage` to keep users logged in across page reloads until they explicitly click "Logout".
- [x] **Single Page Architecture:** Smoothly transitions between Login, Registration, and Dashboard views without page reloads using DOM manipulation.

##  Tech Stack

- **HTML5:** Semantic structure for views.
- **CSS3:** Custom UI with modern, wider form layouts, smooth CSS animations (`@keyframes` for view transitions), and responsive design.
- **JavaScript (Vanilla):** Handles all validation, view toggling, and data operations without external libraries.

##  Technical Approach

Since this is a client-side implementation (Approach A):
1. **Mock Database:** `localStorage` acts as our persistent database (`users` array) to store registered credentials across browser sessions.
2. **Session State:** `sessionStorage` is used to store the `loggedInUser`. This ensures that if a user closes the tab, they are logged out, mimicking standard session behavior.
3. **Regex Validation:** Regular expressions (e.g., `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` for emails and `/\d/` for numbers) are utilized for strict input sanitization and formatting checks.

## Project Structure

```text
📦 auth-system
 ┣ 📜 index.html    # Contains Login