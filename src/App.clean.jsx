import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 px-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Workouts Pro
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Workouts Pro
          </h2>
        </div>
      </main>
      
      <footer className="py-8 px-4 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>
            Professional Training Strategies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;