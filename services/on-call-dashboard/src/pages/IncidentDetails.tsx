import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchIncidentById, acknowledgeIncidentApi, resolveIncidentApi } from '../api/incidentApi';
import type { Incident } from './Dashboard'; 
import './IncidentDetails.css'; 

// 1. Helper function (Outside the component)
const calculateTimeDiff = (startIso: string, endIso: string) => {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  
  const diffInMs = end - start;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }
  
  const hours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export default function IncidentDetails() {
  const { id } = useParams<{ id: string }>(); 
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIncident = async () => {
      if (!id) return;
      const data = await fetchIncidentById(id);
      setIncident(data);
      setLoading(false);
    };
    loadIncident();
  }, [id]); 
  //
// 👇 ADD THESE TWO FUNCTIONS 👇
  const handleAcknowledge = async () => {
    if (!incident) return;
    try {
      await acknowledgeIncidentApi(incident.id);
      // Re-fetch to instantly update the UI with the new timestamps!
      const updatedData = await fetchIncidentById(incident.id);
      setIncident(updatedData);
    } catch (error) {
      console.error("Failed to acknowledge:", error);
    }
  };

  const handleResolve = async () => {
    if (!incident) return;
    try {
      await resolveIncidentApi(incident.id);
      const updatedData = await fetchIncidentById(incident.id);
      setIncident(updatedData);
    } catch (error) {
      console.error("Failed to resolve:", error);
    }
  };
  // 👆 ---------------------- 👆
  if (loading) return <div className="details-container">Loading Incident {id}...</div>;
  if (!incident) return <div className="details-container">Incident not found!</div>;

  const displayId = `INC-${incident.id.slice(0, 4).toUpperCase()}`;

  // 👇 2. DEFINE THE VARIABLES HERE! (Inside the component, before the return) 👇
  const mttaDisplay = incident.isAcknowledged && incident.acknowledgedAt
    ? calculateTimeDiff(incident.createdAt, incident.acknowledgedAt)
    : 'N/A';

  const mttrDisplay = incident.isResolved && incident.resolvedAt
    ? calculateTimeDiff(incident.createdAt, incident.resolvedAt)
    : 'N/A';
  // 👆 ---------------------------------------------------------------------- 👆

  return (
    <div className="details-container">
      
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="incident-card">
        
        {/* TOP SECTION: The Title and Stats */}
        <div className="card-header">
          <h1 className="incident-title">
            <span style={{ color: incident.severity === 'CRITICAL' ? '#ff4444' : '#ff8800' }}>●</span> 
            Incident {displayId}
          </h1>
          
          <div className="stats-grid">
            <div className="stat-block">
              <span className="stat-label">Service</span>
              <span className="stat-value">{incident.service}</span>
            </div>
            <div className="stat-block">
              <span className="stat-label">Severity</span>
              <span className="stat-value" style={{ color: '#ffcc00' }}>{incident.severity}</span>
            </div>
            <div className="stat-block">
              <span className="stat-label">Status</span>
              <span className="stat-value">{incident.status}</span>
            </div>
            <div className="stat-block">
              <span className="stat-label">Assigned To</span>
              <span className="stat-value">{incident.assigneeName || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: The Details */}
        <div className="card-body">
          <span className="stat-label">Description </span>
          <div className="description-box">
            {incident.description}
          </div>
        </div>

        {/* BOTTOM SECTION: Actions & Metrics */}
        <div className="actions-section">
        <div className="button-group">
        <button 
        className="btn btn-ack"
        disabled={incident.isAcknowledged} 
        onClick={handleAcknowledge} /* 👈 THIS IS THE MAGIC TRIGGER! */
        >
        {incident.isAcknowledged ? '✓ ACKNOWLEDGED' : 'ACKNOWLEDGE'}
        </button>

        <button 
        className="btn btn-resolve"
        disabled={incident.isResolved}
        onClick={handleResolve}     /* 👈 THIS IS THE MAGIC TRIGGER! */
        >
        {incident.isResolved ? '✓ RESOLVED' : 'RESOLVE INCIDENT'}
            </button>
          </div>
          {/* Metrics pushed to the right side */}
          <div style={{ textAlign: 'right' }}>
            <div className="stat-block" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              <span className="stat-label">MTTA:</span>
              <span className="stat-value" style={{ fontSize: '0.85rem' }}>
                {mttaDisplay} 
              </span>
            </div>
            <div className="stat-block" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <span className="stat-label">MTTR:</span>
              <span className="stat-value" style={{ fontSize: '0.85rem' }}>
                {mttrDisplay}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
