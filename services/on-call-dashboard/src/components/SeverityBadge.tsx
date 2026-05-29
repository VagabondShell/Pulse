interface SeverityBadgeProps {
  severity: string;
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getSeverityColor = (sev: string) => {
    // 1. Normalize the string so 'Medium', 'medium', and 'MEDIUM' all work
    const normalizedSev = sev?.toUpperCase(); 
    if (normalizedSev === 'CRITICAL') return '#ff4444'; 
    if (normalizedSev === 'HIGH') return '#ff4444'; // Adjusted to match your new red HIGH counters!
    if (normalizedSev === 'MEDIUM' || normalizedSev === 'MED') return '#ff9f0a'; 
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
      {/* 3. Make sure the text on the badge is also uppercase! */}
      {severity?.toUpperCase()}
    </span>
  );
}
