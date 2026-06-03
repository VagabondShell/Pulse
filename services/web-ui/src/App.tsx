import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncidentDetails from './pages/IncidentDetails'; // 👈 1. Import the new page!
import OnCallSchedule from './pages/OnCallSchedule';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incident/:id" element={<IncidentDetails />} />
        <Route path="/teams" element={<OnCallSchedule />} />
        
      </Routes>
    </Router>
  );
}
