// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
// 1. Import the function from your API file (adjust the path if needed)
import { fetchIncidentsFromBackend } from './api/incidentApi'; 

export default function Dashboard() {
  // 2. Create a memory slot to hold the raw JSON
  const [rawJsonData, setRawJsonData] = useState<any>(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchIncidentsFromBackend(); 
      setRawJsonData(data);
    };

    loadData();
  }, []); 

  // 6. Draw the UI
  return (
    <div style={{ padding: '2rem', backgroundColor: '#1e1e1e', color: '#00ff00', minHeight: '100vh' }}>
      <h2>Raw Database Output:</h2>
      <pre style={{ fontSize: '14px' }}>
        {JSON.stringify(rawJsonData, null, 2)}
      </pre>
    </div>
  );
}
