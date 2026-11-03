const ESTADOS = [
  "Abierto",
  "Asignado",
  "En proceso",
  "En espera",
  "Resuelto",
  "Cerrado",
  "Cancelado",
];

const COLORES_PRIORIDAD = {
  Alta: "#d32f2f",
  Media: "#ed6c02",
  Baja: "#2e7d32",
};

function TicketCard({ ticket, onUpdateStatus, onDeleteTicket }) {
  const colorPrioridad = COLORES_PRIORIDAD[ticket.prioridad] || "#616161";

  const estilos = {
    tarjeta: {
      border: "1px solid #e0e0e0",
      borderLeft: `6px solid ${colorPrioridad}`,
      borderRadius: "8px",
      padding: "16px",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      overflow: "hidden",
      height: "100%", // Ocupa toda la altura de la fila del grid
      boxSizing: "border-box",
    },
    encabezado: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
    },
    empresa: {
      margin: 0,
      fontSize: "18px",
      color: "#212121",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
    },
    prioridad: {
      backgroundColor: colorPrioridad,
      color: "#ffffff",
      borderRadius: "12px",
      padding: "4px 12px",
      fontSize: "12px",
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
    datos: {
      display: "grid",
      gridTemplateColumns: "85px minmax(0, 1fr)",
      gap: "6px 12px",
      fontSize: "14px",
      color: "#424242",
      textAlign: "left",
    },
    etiqueta: {
      fontWeight: "bold",
      color: "#616161",
    },
    valor: {
      wordBreak: "break-word",
      overflowWrap: "anywhere",
    },
    descripcion: {
      margin: 0,
      fontSize: "14px",
      color: "#424242",
      textAlign: "left",
      lineHeight: 1.5,
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      marginBottom: "8px",
    },
    acciones: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      borderTop: "1px solid #eeeeee",
      paddingTop: "12px",
      marginTop: "auto", // Estandariza la posición: empuja siempre la barra de acciones al fondo
    },
    select: {
      padding: "6px 10px",
      borderRadius: "4px",
      border: "1px solid #bdbdbd",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      color: "#212121",
      minWidth: "135px", // Mantiene un ancho uniforme para todos los estados
      cursor: "pointer",
    },
    botonEliminar: {
      padding: "6px 14px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#d32f2f",
      color: "#ffffff",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <article style={estilos.tarjeta}>
      <header style={estilos.encabezado}>
        <h3 style={estilos.empresa}>{ticket.empresa}</h3>
        <span style={estilos.prioridad}>{ticket.prioridad}</span>
      </header>

      <div style={estilos.datos}>
        <span style={estilos.etiqueta}>Solicitante:</span>
        <span style={estilos.valor}>{ticket.solicitante}</span>

        <span style={estilos.etiqueta}>Correo:</span>
        <span style={estilos.valor}>{ticket.correo}</span>

        <span style={estilos.etiqueta}>Celular:</span>
        <span style={estilos.valor}>{ticket.celular}</span>

        <span style={estilos.etiqueta}>Estado:</span>
        <span style={estilos.valor}>{ticket.estado}</span>
      </div>

      <p style={estilos.descripcion}>{ticket.descripcion}</p>

      <footer style={estilos.acciones}>
        <select
          style={estilos.select}
          value={ticket.estado}
          onChange={(evento) => onUpdateStatus(ticket.id, evento.target.value)}
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>

        <button
          type="button"
          style={estilos.botonEliminar}
          onClick={() => onDeleteTicket(ticket.id)}
        >
          Eliminar
        </button>
      </footer>
    </article>
  );
}

export default TicketCard;
