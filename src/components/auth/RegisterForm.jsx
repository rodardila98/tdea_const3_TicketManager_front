import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { register as registerService } from "../../api/authService";

export default function RegisterForm({ onRegisterSuccess, onIrALogin }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim() || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');
    setCargando(true);

    try {
      await registerService(nombre.trim(), email.trim(), password);
      setMensajeExito('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      setTimeout(() => {
        onRegisterSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error al registrar la cuenta');
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
        <span style={{ fontSize: '36px' }}>📝</span>
        <h2 style={{ margin: '8px 0 4px 0', color: '#0f172a', fontSize: '1.4rem' }}>
          Crear una cuenta
        </h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
          Regístrate como nuevo agente para gestionar tickets
        </p>
      </div>

      {mensajeExito && (
        <p style={{
          color: '#16a34a',
          backgroundColor: '#f0fdf4',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          border: '1px solid #bbf7d0',
          marginBottom: '16px'
        }}>
          ✅ {mensajeExito}
        </p>
      )}

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
        label="Nombre completo"
        placeholder="Juan Pérez"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <Input
        type="email"
        label="Correo electrónico"
        placeholder="juan@correo.com"
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
        {cargando ? 'Registrando...' : 'Crear cuenta'}
      </Button>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onIrALogin}
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
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </form>
  );
}
