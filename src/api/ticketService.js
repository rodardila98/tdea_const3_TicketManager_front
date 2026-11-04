// Servicio para comunicación con la API protegida de tickets del backend
import { getToken } from "./authService";

const API_URL = "http://localhost:3001/tickets";

// Función auxiliar para construir cabeceras con token JWT
const getAuthHeaders = () => {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

// 1. Obtener los tickets autorizados (GET)
export const getTickets = async () => {
    const respuesta = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.error || `Error ${respuesta.status}: No se pudieron obtener los tickets`);
    }

    return datos;
};

// 2. Crear un nuevo ticket (POST)
export const createTicket = async (nuevoTicket) => {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(nuevoTicket),
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        const mensajeError = datos.detalles ? datos.detalles.join(', ') : (datos.error || 'Error al crear el ticket');
        throw new Error(mensajeError);
    }

    return datos;
};

// 3. Actualizar el estado de un ticket (PATCH)
export const updateTicket = async (id, nuevoEstado) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ estado: nuevoEstado }),
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al actualizar el estado del ticket');
    }

    return datos;
};

// 4. Eliminar un ticket (DELETE)
export const deleteTicket = async (id) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al eliminar el ticket');
    }

    return datos;
};
