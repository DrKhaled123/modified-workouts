I will perform the following steps to transform your workout application into a professional, data-rich, and well-structured app.

### Phase 1: Architecture & Codebase Cleanup (Fixing Issues & Logic)
1.  **Refactor `App.jsx`**: Break down the massive `App.jsx` file into smaller, manageable components:
    *   `components/Layout/Layout.jsx`: Main wrapper with Header and Footer.
    *   `components/Dashboard/Dashboard.jsx`: The main view controller.
    *   `components/Workout/WorkoutSection.jsx`: Handling workout plans and exercises.
    *   `components/Timer/Timer.jsx`: A reusable, isolated timer component.
    *   `context/LanguageContext.jsx`: Create a global context for managing English/Arabic switching cleanly.
2.  **Fix CSS Bloat**: Replace the huge, repetitive `index.css` with a standard Tailwind CSS setup. I will remove the thousands of lines of generated code and use utility classes directly in components for better maintainability and performance.
3.  **Error Handling**: Implement proper error boundaries to prevent the app from crashing if data is missing.

### Phase 2: Data Engineering (Fetch Data from .md & .json)
1.  **Create Data Structure**:
    *   Create a `public/data` directory.
    *   Convert `src/workoutData.js` into JSON files: `public/data/workouts.json`, `public/data/nutrition.json`, `public/data/goals.json`.
    *   Create a `public/data/articles` folder for Markdown files to support rich text content (e.g., "Science of Hypertrophy").
2.  **Implement Data Fetching**:
    *   Create a custom hook `useDataFetcher` that automatically loads these JSON files when the app starts.
    *   Implement a simple Markdown parser (or use a lightweight library if available/allowed) to render the `.md` content dynamically.

### Phase 3: UI/UX Enhancement (Enhance Appearance)
1.  **Redesign Dashboard**:
    *   Move away from the "long scrolling list" design.
    *   Implement a **Grid-based Dashboard** with clear, clickable cards for "Goals", "Plans", "Nutrition", and "Recovery".
    *   Add a **Sidebar or Tab Navigation** for easier switching between views.
2.  **Modern Styling**:
    *   Refine the color palette to a professional "Dark Mode" gym aesthetic with consistent neon accents (Indigo/Emerald/Amber).
    *   Improve typography for both English and Arabic (RTL support).
    *   Add smooth transitions and hover effects for a more interactive feel.
3.  **Floating Timer**: Make the workout timer a persistent floating widget so users can see it while navigating different parts of the app.

I will start by refactoring the CSS and creating the component structure.
