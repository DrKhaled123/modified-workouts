I will upgrade the application with full Arabic support for the Education section, advanced timer functionality for exercises, and new professional workout plans, then deploy these changes to your Hetzner server.

### Phase 1: Education Section - Arabic Localization
I will implement a seamless translation toggle for all educational content.
1.  **Content Creation**: Create Arabic versions of all 10 existing markdown articles (e.g., `fasting.ar.md`, `recovery.ar.md`) with high-quality, scientifically accurate terminology.
2.  **Component Logic**: Update `ArticleViewer.jsx` to automatically fetch the correct language file (`.ar.md` vs `.md`) based on the user's selected language.

### Phase 2: Advanced Timer & New Workout Plans
I will enhance the training utility and content depth.
1.  **Exercise Timer**: Update the `WorkoutSection` component to support "Work Timers" (not just Rest Timers). This is crucial for duration-based exercises like Planks or AMRAPs.
2.  **New Plans (Goals & Workouts)**:
    *   **Athletic Conditioning**: Focus on speed, agility, and power (using the new timer feature).
    *   **Mobility & Longevity**: Joint health and flexibility routines.
    *   **Calisthenics Mastery**: Advanced bodyweight progressions.
3.  **Data Update**: Update `workouts.json` to include `duration` fields for time-based exercises.

### Phase 3: Deployment & Verification
1.  **Build**: Compile the enhanced application locally.
2.  **Deploy**: Use `rsync` to securely push the new build to `/root/trae_workouts/dist` on your server (`46.62.228.173`).
3.  **Verify**: Perform a confirmation test via `curl` and browser simulation to ensure the Arabic toggle and new timers function correctly in the production environment.
