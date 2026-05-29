import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* The Root Route: When the URL is exactly "/", draw the Dashboard */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
