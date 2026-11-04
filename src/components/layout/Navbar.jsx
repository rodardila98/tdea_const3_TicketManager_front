export default function Navbar({ usuario, onLogout }) {
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
          Ticket Manager - TdeA
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#cbd5e1' }}>
        {usuario ? (
          <>
            <span>
              👤 <strong style={{ color: '#ffffff' }}>{usuario.nombre || usuario.email}</strong>
              <span style={{
                marginLeft: '8px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: usuario.role === 'admin' ? '#7c3aed' : '#0284c7',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {usuario.role}
              </span>
            </span>

            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <span>Acceso al sistema</span>
        )}
      </div>
    </nav>
  );
}
