import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TravelLogsPage from './pages/TravelLogsPage';
import JourneyPlansPage from './pages/JourneyPlansPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/travel-logs" element={<TravelLogsPage />} />
        <Route path="/journey-plans" element={<JourneyPlansPage />} />
      </Routes>
    </Router>
  );
}

export default App;

