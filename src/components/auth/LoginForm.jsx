import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm({ onLoginSuccess, onIrARegistro }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Por favor completa el correo y la contraseña.');
      return;
    }

    setError('');
    setCargando(true);

    try {
      await onLoginSuccess(email.trim(), password);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#ffffff',
        padding: '36px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
        maxWidth: '420px',
        margin: '60px auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '36px' }}>🔐</span>
        <h2 style={{ margin: '8px 0 4px 0', color: '#0f172a', fontSize: '1.4rem' }}>
          Iniciar Sesión
        </h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
          Ingresa con tu cuenta de agente o administrador para gestionar los tickets
        </p>
      </div>

      {error && (
        <p style={{
          color: '#ef4444',
          backgroundColor: '#fef2f2',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          border: '1px solid #fecaca',
          marginBottom: '16px'
        }}>
          {error}
        </p>
      )}

      <Input
        type="email"
        label="Correo electrónico"
        placeholder="ejemplo@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit">
        {cargando ? 'Ingresando...' : 'Acceder al sistema'}
      </Button>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onIrARegistro}
            style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
              fontSize: '13px',
              textDecoration: 'underline'
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </form>
  );
}
