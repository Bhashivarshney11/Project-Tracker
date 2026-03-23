# Project Tracker

A fully functional **multi-view project management tool** built with **React + TypeScript + Tailwind CSS**. This project demonstrates advanced frontend engineering concepts including **custom drag-and-drop**, **virtual scrolling**, **live collaboration indicators**, and **URL-synced filters**.

Live Demo: [Your Live Deployment Link Here]  
GitHub Repository: [https://github.com/Bhashivarshney11/Project-Tracker](https://github.com/Bhashivarshney11/Project-Tracker)

---

## Features

### 1. Multi-View Interface
- **Kanban Board**: Four columns (To Do, In Progress, In Review, Done) with scrollable columns. Cards display title, initials-based assignee avatar, priority badge (color-coded), and due date with overdue highlighting.
- **List View**: Flat table with sortable columns (title, priority, due date). Supports inline status changes via dropdown.
- **Timeline/Gantt View**: Tasks plotted on a horizontal time axis, color-coded by priority. Today's date is marked with a vertical line. Tasks without start dates still appear on due date.

### 2. Custom Drag-and-Drop
- Implemented using native **HTML5 drag events** — no external libraries.
- Cards follow the cursor with opacity reduction and drop shadow.
- Placeholder maintains layout to avoid shift.
- Valid drop zones highlight on hover; invalid drops snap back smoothly.
- Supports both **mouse and touch devices**.

### 3. Virtual Scrolling (List View)
- Efficient rendering for **500+ tasks**.
- Only visible rows plus a small buffer are rendered.
- Scroll position and total row count remain accurate.
- Smooth scrolling with no flickering or blank gaps.

### 4. Live Collaboration Indicators
- Simulates 2–4 users viewing/editing tasks.
- Active users shown with colored avatars stacked on cards.
- Animated movement of avatars between tasks.
- Board header shows the current number of active viewers.

### 5. Filters & URL State
- Filter by status, priority, assignee, and due date range.
- Filters apply instantly and reflect in URL for sharing/bookmarking.
- "Clear filters" button appears only when active filters exist.
- Navigating back restores exact filter state.

### 6. Edge Cases & Empty States
- Columns with no tasks display a styled empty state.
- Tasks due today labeled "Due Today".
- Overdue tasks show the number of overdue days if >7 days.

---

## Technical Stack
- **Framework:** React with TypeScript  
- **Styling:** Tailwind CSS (no component libraries used)  
- **State Management:** Zustand (for global task state, drag-and-drop state, and filters)  
- **Data:** Seed generator produces 500+ tasks with randomized properties  

**Why Zustand?** Lightweight, simple API for global state, reactive, and works well for drag-and-drop and live updates without prop-drilling.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Bhashivarshney11/Project-Tracker.git
   cd Project-Tracker

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open in your browser:
http://localhost:5173