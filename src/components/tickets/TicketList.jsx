import TicketCard from "./TicketCard";

function TicketList({ tickets, onUpdateStatus, onDeleteTicket }) {
  const estilos = {
    lista: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "16px",
      padding: "16px 0",
      alignItems: "stretch", // Todas las tarjetas de una misma fila tienen exactamente la misma altura
    },
  };

  return (
    <section style={estilos.lista}>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onUpdateStatus={onUpdateStatus}
          onDeleteTicket={onDeleteTicket}
        />
      ))}
    </section>
  );
}

export default TicketList;
