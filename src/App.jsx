import { useState, useEffect } from "react";

// Servicios de datos (Dev 3)
import { getTickets, createTicket, updateTicket, deleteTicket } from "./api/ticketService";

// Componentes de Interfaz (Dev 1 y Dev 2)
import Navbar from "./components/layout/Navbar";
import TicketForm from "./components/tickets/TicketForm";
import TicketList from "./components/tickets/TicketList";

export default function App() {
    const [tickets, setTickets] = useState([]);
    // NUEVO: Estado para controlar qué "pestaña" o vista se muestra
    const [vistaActual, setVistaActual] = useState("lista"); // Puede ser "lista" o "formulario"

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const datos = await getTickets();
        setTickets(datos || []);
    };

    const handleCrearTicket = async (nuevoTicket) => {
        const ticketGuardado = await createTicket(nuevoTicket);
        if (ticketGuardado) {
            setTickets([...tickets, ticketGuardado]);
            // NUEVO: Redirección automática a la lista después de guardar
            setVistaActual("lista");
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        const ticketActualizado = await updateTicket(id, nuevoEstado);
        if (ticketActualizado) {
            const listaActualizada = tickets.map((t) =>
                t.id === id ? ticketActualizado : t
            );
            setTickets(listaActualizada);
        }
    };

    const handleEliminarTicket = async (id) => {
        await deleteTicket(id);
        const listaFiltrada = tickets.filter((t) => t.id !== id);
        setTickets(listaFiltrada);
    };

    const estilos = {
        contenedor: {
            backgroundColor: "#f8fafc",
            minHeight: "100vh",
            fontFamily: "system-ui, -apple-system, sans-serif",
        },
        main: {
            padding: "32px",
            maxWidth: "1000px", // Reducimos un poco el ancho máximo para que se vea mejor centrado
            margin: "0 auto",
        },
        // Estilos para el menú de pestañas
        menuNavegacion: {
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "10px"
        },
        botonPestana: (activa) => ({
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activa ? "#0b192c" : "transparent",
            color: activa ? "#ffffff" : "#475569",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "15px",
            transition: "all 0.2s"
        }),
        tituloSeccion: {
            color: "#0f172a",
            fontSize: "24px",
            marginBottom: "20px",
        }
    };

    return (
        <div style={estilos.contenedor}>
            <Navbar />

            <main style={estilos.main}>

                {/* Menú de navegación simulando pestañas */}
                <nav style={estilos.menuNavegacion}>
                    <button
                        style={estilos.botonPestana(vistaActual === "formulario")}
                        onClick={() => setVistaActual("formulario")}
                    >
                        ➕ Nuevo ticket
                    </button>
                    <button
                        style={estilos.botonPestana(vistaActual === "lista")}
                        onClick={() => setVistaActual("lista")}
                    >
                        📋 Ver tickets
                    </button>
                </nav>

                {/* Renderizado Condicional: Solo dibuja el componente que coincide con el estado */}
                {vistaActual === "formulario" ? (
                    <section>
                        <TicketForm onTicketCreated={handleCrearTicket} />
                    </section>
                ) : (
                    <section>
                        <h2 style={estilos.tituloSeccion}>Gestión de tickets activos</h2>
                        <TicketList
                            tickets={tickets}
                            onUpdateStatus={handleCambiarEstado}
                            onDeleteTicket={handleEliminarTicket}
                        />
                    </section>
                )}

            </main>
        </div>
    );
}