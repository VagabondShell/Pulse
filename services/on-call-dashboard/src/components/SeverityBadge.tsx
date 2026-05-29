interface SeverityBadgeProps {
  severity: string;
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getSeverityColor = (sev: string) => {
    if (sev === 'CRITICAL') return '#ff4444'; 
    if (sev === 'HIGH') return '#ff8800'; 
    if (sev === 'MED') return '#ffcc00'; 
    return '#00C851'; 
  };

  return (
    <span style={{ 
      backgroundColor: getSeverityColor(severity), 
      color: '#000', 
      padding: '2px 8px', 
      borderRadius: '12px',
      fontSize: '0.85rem',
      fontWeight: 'bold'
    }}>
      {severity}
    </span>
  );
}
