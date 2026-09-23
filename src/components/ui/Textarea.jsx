export default function Textarea({ label, placeholder, value, onChange, name, required, rows = 3 }) {
  return (
    <div style={{ marginBottom: "16px", display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}
      
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
          outline: 'none'
        }}
      />
    </div>
  );
}