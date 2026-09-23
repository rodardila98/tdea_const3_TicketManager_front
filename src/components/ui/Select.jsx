export default function Select({ label, value, onChange, name, required, options = [] }) {
  return (
    <div style={{ marginBottom: "24px", display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}
      
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        {options.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
}