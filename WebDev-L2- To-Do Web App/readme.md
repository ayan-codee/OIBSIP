# To-Do Web App

An interactive, responsive, and state-driven task management application built using Vanilla JavaScript. This project demonstrates core web development concepts including DOM manipulation, event handling, state management, and browser data persistence.

## Features

All required features and bonus objectives have been successfully implemented:

- [x] **Add Tasks:** Create new tasks seamlessly with an intuitive input field.
- [x] **Smart Categorization:** Tasks are automatically organized into **Pending** and **Completed** lists.
- [x] **Mark Complete:** Custom animated checkboxes to toggle task status. Completed tasks instantly move to the bottom list.
- [x] **Inline Editing:** Click the edit icon to modify the task text directly within the list item (saves on 'Enter' or blur).
- [x] **Delete Functionality:** Permanently remove tasks from either list.
- [x] **Dynamic Counters:** Real-time task count indicators ("X pending" and "Y completed") displayed above each section.
- [x] **Empty States:** Friendly, contextual messages appear when a list has no items.
- [x] **Timestamps (Bonus):** Each task displays exactly when it was added or completed.
- [x] **Data Persistence (Bonus):** Fully integrated with `localStorage`. Your tasks survive page refreshes and browser restarts.

## Tech Stack

- **HTML5:** Semantic structure and accessibility.
- **CSS3:** Custom styling using CSS Variables, Flexbox for layout, hover states, and smooth transitions (No external frameworks used).
- **JavaScript (Vanilla/ES6+):** Pure JavaScript handling state logic, DOM rendering, and LocalStorage APIs.

## Technical Approach & Architecture

This application is built using a **State-Driven UI** pattern. Instead of manipulating the DOM directly for every action, the app maintains a "Single Source of Truth" (an array of task objects). 

1. **State Management:** All tasks exist in a `tasks` array.
2. **Action Modifies State:** Adding, editing, completing, or deleting a task updates this JavaScript array first.
3. **Render Updates DOM:** After any state change, the `saveAndRender()` function is called. This function saves the current state to `localStorage` and dynamically re-renders the DOM to reflect the exact state of the data array.

This pattern makes the code predictable, scalable, and easy to debug, closely mirroring how modern frameworks like React handle UI changes.

##  Project Structure

```text
📦 todo-app
 ┣ 📜 index.html    # The main HTML skeleton and UI containers
 ┣ 📜 style.css     # Premium UI styling, modern inputs, and custom checkboxes
 ┣ 📜 app.js        # Core logic, state management, and DOM manipulation
 ┗ 📜 README.md     # Project documentation