import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchIncidentsFromBackend } from '../api/incidentApi';
import { formatDistanceToNow } from 'date-fns';
import SeverityBadge from '../components/SeverityBadge'; 
import './Dashboard.css'; 

// Inside Dashboard.tsx
export interface Incident {
  id: string;
  service: string;
  severity: string;
  status: string;
  assigneeName: string;
  description: string;
  createdAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  isAcknowledged: boolean;
  isResolved: boolean;
}

export default function Dashboard() {
  // 1. STATE (The Memory)
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. EFFECT (Fetching the Data)
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchIncidentsFromBackend();
      if (data) setIncidents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // 3. MEMO (Counting the Active Incidents)
  const severityCounts = useMemo(() => {
    return incidents.reduce((acc, incident) => {
      const sev = incident.severity;
      if (acc[sev] !== undefined) {
        acc[sev]++;
      } else {
        acc[sev] = 1;
      }
      return acc;
    }, { HIGH: 0, MEDIUM: 0, LOW: 0 } as Record<string, number>);
  }, [incidents]);

  // 4. RENDER (Drawing the UI)
  if (loading) return <div className="dashboard-container">Loading Pulse...</div>;

  return (
    <div className="dashboard-container">
      
      {/* Sleek New Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <span style={{ color: '#ff4444' }}>●</span> Active Incidents
          </h1>
          <div className="dashboard-subtitle">Real-time system monitoring</div>
          </div>
          </div>

          {/* Tighter, Smaller Counters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>

          {/* HIGH Counter - Urgent Red */}
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.4)', borderRadius: '6px', minWidth: '100px' }}>
          <div style={{ fontSize: '0.75rem', color: '#ff4444', fontWeight: 'bold', letterSpacing: '1px' }}>HIGH</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>{severityCounts.HIGH}</div>
          </div>

          {/* MED Counter - Warning Orange/Yellow */}
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255, 159, 10, 0.1)', border: '1px solid rgba(255, 159, 10, 0.4)', borderRadius: '6px', minWidth: '100px' }}>
          <div style={{ fontSize: '0.75rem', color: '#ff9f0a', fontWeight: 'bold', letterSpacing: '1px' }}>MED</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>{severityCounts.MEDIUM}</div>
          </div>

      </div>
      {/* The Incident Table */}
      <div className="table-container">
        <table className="incident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => {
              const displayId = `INC-${incident.id.slice(0, 4).toUpperCase()}`;
              
              let timeAgo = 'Unknown';
              try { 
                timeAgo = formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true }); 
              } catch {
                // Ignore parsing errors for invalid dates
              }

              return (
                <tr key={incident.id}>
                  <td className="incident-id">
                    {/* The Link to the Incident Details Page */}
                    <Link to={`/incident/${incident.id}`} style={{ color: '#66b3ff', textDecoration: 'none' }}>
                      {displayId}
                    </Link>
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#fff' }}>{incident.service}</td>
                  
                  {/* If you didn't make the component, replace the line below with: <td style={{ fontWeight: 'bold' }}>{incident.severity}</td> */}
                  <td><SeverityBadge severity={incident.severity} /></td>
                  
                  <td>
                    <span style={{ 
                      color: incident.status === 'TRIGGERED' ? '#ff4444' : '#00C851',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}>
                      {incident.status}
                    </span>
                  </td>
                  <td style={{ color: incident.assigneeName ? '#e0e0e0' : '#666' }}>
                    {incident.assigneeName || 'Unassigned'}
                  </td>
                  <td style={{ color: '#888' }}>{timeAgo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
