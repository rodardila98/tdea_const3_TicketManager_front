import { useState, useEffect } from "react";

// Servicios de datos y autenticación
import { getTickets, createTicket, updateTicket, deleteTicket } from "./api/ticketService";
import { login as loginService, logout as logoutService, getUsuarioActual } from "./api/authService";

// Componentes de Interfaz
import Navbar from "./components/layout/Navbar";
import TicketForm from "./components/tickets/TicketForm";
import TicketList from "./components/tickets/TicketList";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

export default function App() {
    const [usuario, setUsuario] = useState(getUsuarioActual());
    const [tickets, setTickets] = useState([]);
    const [vistaActual, setVistaActual] = useState("lista"); // 'lista' o 'formulario'
    const [modoAuth, setModoAuth] = useState("login"); // 'login' o 'registro'
    const [errorApi, setErrorApi] = useState("");

    const handleLogout = () => {
        logoutService();
        setUsuario(null);
        setTickets([]);
        setErrorApi("");
        setModoAuth("login");
    };

    const handleLogin = async (email, password) => {
        const respuesta = await loginService(email, password);
        setUsuario(respuesta.user);
    };

    // Cargar tickets solo si hay un usuario autenticado
    useEffect(() => {
        let isMounted = true;

        if (usuario) {
            getTickets()
                .then((datos) => {
                    if (isMounted) {
                        setTickets(datos || []);
                        setErrorApi("");
                    }
                })
                .catch((err) => {
                    if (isMounted) {
                        setErrorApi(err.message);
                        // Si el token es inválido o expiró, cerramos la sesión automáticamente
                        if (err.message.includes("401") || err.message.includes("Token")) {
                            handleLogout();
                        }
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [usuario]);

    const handleCrearTicket = async (nuevoTicket) => {
        try {
            const ticketGuardado = await createTicket(nuevoTicket);
            if (ticketGuardado) {
                setTickets([ticketGuardado, ...tickets]);
                setVistaActual("lista");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            const ticketActualizado = await updateTicket(id, nuevoEstado);
            if (ticketActualizado) {
                const listaActualizada = tickets.map((t) =>
                    t.id === id ? ticketActualizado : t
                );
                setTickets(listaActualizada);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEliminarTicket = async (id) => {
        try {
            await deleteTicket(id);
            const listaFiltrada = tickets.filter((t) => t.id !== id);
            setTickets(listaFiltrada);
        } catch (err) {
            alert(err.message);
        }
    };

    const estilos = {
        contenedor: {
            backgroundColor: "#f8fafc",
            minHeight: "100vh",
            fontFamily: "system-ui, -apple-system, sans-serif",
        },
        main: {
            padding: "32px",
            maxWidth: "1000px",
            margin: "0 auto",
        },
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
        },
        bannerError: {
            backgroundColor: "#fef2f2",
            color: "#b91c1c",
            border: "1px solid #fecaca",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px"
        }
    };

    return (
        <div style={estilos.contenedor}>
            <Navbar usuario={usuario} onLogout={handleLogout} />

            <main style={estilos.main}>
                {!usuario ? (
                    // Si no está autenticado, alternamos entre Login y Registro
                    modoAuth === "login" ? (
                        <LoginForm
                            onLoginSuccess={handleLogin}
                            onIrARegistro={() => setModoAuth("registro")}
                        />
                    ) : (
                        <RegisterForm
                            onRegisterSuccess={() => setModoAuth("login")}
                            onIrALogin={() => setModoAuth("login")}
                        />
                    )
                ) : (
                    // Si está autenticado, mostramos la interfaz de tickets
                    <>
                        {errorApi && (
                            <div style={estilos.bannerError}>
                                ⚠️ <strong>Aviso:</strong> {errorApi}
                            </div>
                        )}

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
                                📋 Ver tickets ({tickets.length})
                            </button>
                        </nav>

                        {vistaActual === "formulario" ? (
                            <section>
                                <TicketForm onTicketCreated={handleCrearTicket} />
                            </section>
                        ) : (
                            <section>
                                <h2 style={estilos.tituloSeccion}>
                                    Gestión de tickets activos ({usuario.role === 'admin' ? 'Todos los tickets' : 'Mis tickets asignados'})
                                </h2>
                                <TicketList
                                    tickets={tickets}
                                    onUpdateStatus={handleCambiarEstado}
                                    onDeleteTicket={handleEliminarTicket}
                                    esAdmin={usuario?.role === 'admin'}
                                />
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
