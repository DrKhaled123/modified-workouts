import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { TimerProvider } from './context/TimerContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <TimerProvider>
          <Layout>
            <Dashboard />
          </Layout>
        </TimerProvider>
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
