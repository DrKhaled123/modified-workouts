import React, { createContext, useState, useEffect, useCallback } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [workouts, setWorkouts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [goalsRes, nutritionRes, workoutsRes] = await Promise.all([
          fetch('/data/goals.json'),
          fetch('/data/nutrition.json'),
          fetch('/data/workouts.json')
        ]);

        if (!goalsRes.ok || !nutritionRes.ok || !workoutsRes.ok) {
          throw new Error('Failed to fetch data files');
        }

        const goalsData = await goalsRes.json();
        const nutritionData = await nutritionRes.json();
        const workoutsData = await workoutsRes.json();

        setGoals(goalsData);
        setNutrition(nutritionData);
        setWorkouts(workoutsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchArticle = useCallback(async (filename) => {
    try {
      const res = await fetch(`/data/articles/${filename}`);
      if (!res.ok) throw new Error('Article not found');
      return await res.text();
    } catch (err) {
      console.error('Error fetching article:', err);
      return null;
    }
  }, []);

  return (
    <DataContext.Provider value={{ goals, nutrition, workouts, loading, error, fetchArticle }}>
      {children}
    </DataContext.Provider>
  );
};
