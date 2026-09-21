//Creación barra de navegación superior y su estilo unificado con el de input y button

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#0b192c', 
      color: '#ffffff',
      padding: '14px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>🎫</span>
        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>
          Gestor de Tickets - TdeA
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#cbd5e1' }}>
        <span style={{ cursor: 'pointer', color: '#ffffff' }}>🏠 Inicio</span>
        <span style={{ cursor: 'pointer' }}>🎟️ Mis Tickets</span>
        <span style={{ cursor: 'pointer' }}>👤 Perfil ▾</span>
      </div>
    </nav>
  );
}