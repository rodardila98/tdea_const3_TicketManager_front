
//Se importa libreria useState y componentes input y button
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";


export default function TicketForm({onTicketCreated}) {
//Estado por cada componente, es la menara de comunicar con app.jsx
    const [empresa, setEmpresa] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('Baja'); // Valor por defecto para el select de prioridad

    //Estado para error de campos vacios
    const [error, setError] = useState('');

    //Función que procesa el envío del formulario
    const handleSubmit = (e) => {
    e.preventDefault(); //Evita que la página web se recargue

    // Validación: verificar que no haya campos requeridos vacíos
    if (!empresa.trim() || !solicitante.trim() || !descripcion.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setError(''); // Limpia el mensaje de error si la validación pasa

    // Armamos el objeto con la estructura que necesita el sistema
    const nuevoTicket = {
      empresa: empresa,
      solicitante: solicitante,
      descripcion: descripcion,
      prioridad: prioridad,
      estado: 'Abierto' // Estado inicial por defecto
    };

    // Prueba local en consola para verificar el objeto antes de pasarlo al Dev 3
    console.log('Ticket creado por Dev 1:', nuevoTicket);

    // 3. Enviamos el objeto "hacia arriba" mediante la prop onTicketCreated
    if (onTicketCreated) {
      onTicketCreated(nuevoTicket);
    }

    // 4. Limpiamos los campos del formulario tras guardar con éxito
    setEmpresa('');
    setSolicitante('');
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
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem' }}>Crear Nuevo Ticket</h3>
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
        label="Empresa *"
        placeholder="Escribe el nombre de la empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
      />

      {/* Campo 2: Solicitante */}
      <Input
        label="Solicitante *"
        placeholder="Nombre de quien solicita"
        value={solicitante}
        onChange={(e) => setSolicitante(e.target.value)}
      />

      {/* Campo 3: Descripción */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
          Descripción *
        </label>
        <textarea
          rows="3"
          placeholder="Describe el problema o solicitud..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Campo 4: Prioridad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
          Prioridad
        </label>
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            fontSize: '14px'
          }}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      {/* Botón de Enviar */}
      <Button type="submit">
        💾 Guardar Ticket
      </Button>
    </form>
  );
}


