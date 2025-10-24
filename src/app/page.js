export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Energy Monitoring Dashboard</h1>
      <p>Welcome to your energy monitoring dashboard!</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Dashboard Features</h2>
        <ul>
          <li>Daily Usage Tracking</li>
          <li>Weekly Summary</li>
          <li>Monthly Report</li>
          <li>Cost Analysis</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Quick Stats</h3>
        <p>Today's Usage: 12.5 kWh</p>
        <p>This Month: 350 kWh</p>
        <p>Estimated Cost: $45.50</p>
      </div>
    </div>
  );
}
