// Se importa librería useState y componentes reutilizables
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

export default function TicketForm({ onTicketCreated }) {
  // Estado para los campos del formulario
  const [empresa, setEmpresa] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('Baja');

  // Estado para error de validación en frontend
  const [error, setError] = useState('');

  // Función que procesa el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página web se recargue

    // Validación básica: verificar que no haya campos requeridos vacíos
    if (!empresa.trim() || !solicitante.trim() || !correo.trim() || !celular.trim() || !descripcion.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setError(''); // Limpia el mensaje de error si la validación pasa

    // Armamos el objeto con la estructura que necesita el sistema
    const nuevoTicket = {
      empresa: empresa.trim(),
      solicitante: solicitante.trim(),
      correo: correo.trim(),
      celular: celular.trim(),
      descripcion: descripcion.trim(),
      prioridad: prioridad,
      estado: 'Abierto' // Estado inicial por defecto
    };

    // Enviamos el objeto hacia arriba mediante la prop onTicketCreated
    if (onTicketCreated) {
      onTicketCreated(nuevoTicket);
    }

    // Limpiamos los campos del formulario tras guardar con éxito
    setEmpresa('');
    setSolicitante('');
    setCorreo('');
    setCelular(''); // Corregido: antes setcelular (en minúscula) generaba error
    setDescripcion('');
    setPrioridad('Baja');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
        maxWidth: '480px',
        margin: '0 auto'
      }}
    >
      {/* Encabezado de la Tarjeta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '28px', backgroundColor: '#e0f2fe', padding: '8px 12px', borderRadius: '10px' }}>🎫</span>
        <div>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem' }}>Crear nuevo ticket</h3>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
            Completa la información para generar un nuevo ticket de soporte.
          </p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', marginBottom: '20px' }} />

      {/* Mensaje de validación de error */}
      {error && (
        <p style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid #fecaca' }}>
          {error}
        </p>
      )}

      {/* Campo 1: Empresa */}
      <Input
        label="Empresa"
        placeholder="Nombre de la empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        required={true}
      />

      {/* Campo 2: Solicitante */}
      <Input
        label="Solicitante"
        placeholder="Nombre de quien solicita"
        value={solicitante}
        onChange={(e) => setSolicitante(e.target.value)}
        required={true}
      />

      {/* Campo 3: Correo */}
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="ejemplo@empresa.com"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required={true}
      />

      {/* Campo 4: Celular */}
      <Input
        type="tel"
        label="Celular"
        placeholder="Número de contacto"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        required={true}
      />

      {/* Campo 5: Descripción */}
      <Textarea
        label="Descripción"
        placeholder="Describe el problema o solicitud..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      {/* Campo 6: Prioridad */}
      <Select
        label="Prioridad"
        value={prioridad}
        onChange={(e) => setPrioridad(e.target.value)}
        required
        options={["Baja", "Media", "Alta"]}
      />

      {/* Botón de Enviar */}
      <Button type="submit">
        Guardar ticket
      </Button>
    </form>
  );
}
