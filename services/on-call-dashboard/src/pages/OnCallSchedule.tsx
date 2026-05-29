import { useState, useEffect } from 'react';
import { fetchOnCallScheduleByService } from '../api/incidentApi';
import { Link } from 'react-router-dom';

export default function OnCallSchedule() {
  const [selectedService, setSelectedService] = useState('frontend-api');
  const [scheduleData, setScheduleData] = useState<any>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      const data = await fetchOnCallScheduleByService(selectedService);
      setScheduleData(data);
    };
    loadSchedule();
  }, [selectedService]);

  const groupedRotation = scheduleData?.upcomingRotation 
    ? scheduleData.upcomingRotation.reduce((acc: any, slot: any) => {
        if (!acc[slot.weekNumber]) {
          acc[slot.weekNumber] = { 
            weekNumber: slot.weekNumber, 
            primary: 'Unassigned', 
            primaryEmail: '',
            secondary: 'No Secondary Assigned',
            secondaryEmail: ''
          };
        }
        acc[slot.weekNumber][slot.role] = slot.engineerName;
        acc[slot.weekNumber][slot.role + 'Email'] = slot.engineerEmail;
        return acc;
      }, {})
    : {};

  const rotationRows = Object.values(groupedRotation);
  
  // 👇 THIS IS THE MAGIC LINE THAT PREVENTS THE CRASH! 👇
  const currentHeroes: any = scheduleData ? groupedRotation[scheduleData.currentWeek] : null;

  return (
    <div className="details-container" style={{ padding: '2rem 4rem', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh' }}>
      
      <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        ← Back to Dashboard
      </Link>

      <div className="incident-card" style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '2rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #30363d' }}>
          <h2>📅 {scheduleData ? scheduleData.teamName : 'On-Call'} Rotation</h2>
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ padding: '0.75rem', backgroundColor: '#010409', color: '#fff', border: '1px solid #30363d', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            <option value="frontend-api">Frontend API Service</option>
            <option value="payment-service">Payment Service</option>
            <option value="kubernetes-cluster">Kubernetes Cluster</option>
            <option value="database-postgres">PostgreSQL Database</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#8b949e', marginBottom: '1rem' }}>
            Current Week {scheduleData ? `(Week ${scheduleData.currentWeek})` : ''}
          </h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
             
             <div style={{ padding: '1rem', backgroundColor: '#010409', border: '1px solid #32d74b', borderRadius: '8px', flex: 1 }}>
               <div style={{ color: '#32d74b', fontSize: '0.85rem', fontWeight: 'bold' }}>PRIMARY ON-CALL</div>
               {/* 👇 Notice we use currentHeroes here now! 👇 */}
               <div style={{ fontSize: '1.25rem', color: '#fff', marginTop: '0.5rem' }}>
                 {currentHeroes ? currentHeroes.primary : 'Loading...'}
               </div>
               {currentHeroes?.primaryEmail && (
                 <div style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                   📧 {currentHeroes.primaryEmail}
                 </div>
               )}
             </div>

             <div style={{ padding: '1rem', backgroundColor: '#010409', border: '1px solid #30363d', borderRadius: '8px', flex: 1 }}>
               <div style={{ color: '#8b949e', fontSize: '0.85rem', fontWeight: 'bold' }}>SECONDARY (ESCALATION)</div>
               {/* 👇 And we use currentHeroes here! 👇 */}
               <div style={{ fontSize: '1.25rem', color: '#fff', marginTop: '0.5rem' }}>
                 {currentHeroes ? currentHeroes.secondary : 'Loading...'}
               </div>
               {currentHeroes?.secondaryEmail && (
                 <div style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                   📧 {currentHeroes.secondaryEmail}
                 </div>
               )}
             </div>

          </div>
        </div>

        <div>
          <h3 style={{ color: '#8b949e', marginBottom: '1rem' }}>Upcoming Rotation</h3>
          {scheduleData && rotationRows.length > 0 ? (
            <div style={{ border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#c9d1d9' }}>
                <thead style={{ backgroundColor: '#21262d', borderBottom: '1px solid #30363d' }}>
                  <tr>
                    <th style={{ padding: '1rem', fontWeight: 'bold', color: '#8b949e' }}>Week</th>
                    <th style={{ padding: '1rem', fontWeight: 'bold', color: '#8b949e' }}>Primary Engineer</th>
                    <th style={{ padding: '1rem', fontWeight: 'bold', color: '#8b949e' }}>Secondary (Backup)</th>
                  </tr>
                </thead>
                <tbody>
                  {rotationRows.map((row: any) => (
                    <tr key={row.weekNumber} style={{ borderBottom: '1px solid #30363d', backgroundColor: scheduleData.currentWeek === row.weekNumber ? 'rgba(50, 215, 75, 0.05)' : 'transparent' }}>
                      <td style={{ padding: '1rem' }}>
                        Week {row.weekNumber}
                        {scheduleData.currentWeek === row.weekNumber && (
                          <span style={{ marginLeft: '8px', color: '#32d74b', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 6px', border: '1px solid #32d74b', borderRadius: '12px' }}>CURRENT</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>{row.primary}</td>
                      <td style={{ padding: '1rem', color: '#8b949e' }}>{row.secondary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed #30363d', borderRadius: '8px', color: '#8b949e' }}>
              {scheduleData ? 'No upcoming rotation slots found.' : 'Loading schedule...'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
