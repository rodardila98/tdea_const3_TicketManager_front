// src/api/ticketService.js

// Guardamos la URL en una constante para no repetirla en cada función
const API_URL = "http://localhost:3000/tickets";

// 1. Obtener todos los tickets (GET)
export const getTickets = async () => {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los tickets:", error);
        return []; // Retornamos un arreglo vacío para que el map() no falle en React
    }
};

// 2. Crear un nuevo ticket (POST)
export const createTicket = async (nuevoTicket) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoTicket), // Convertimos el objeto de JS a texto JSON
        });
        const datos = await respuesta.json();
        return datos; // Retorna el ticket recién creado (con su nuevo ID)
    } catch (error) {
        console.error("Error al crear el ticket:", error);
    }
};

// 3. Actualizar solo el estado de un ticket (PATCH)
export const updateTicket = async (id, nuevoEstado) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PATCH", // PATCH ya que es el mejor para modificar solo una parte del objeto
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: nuevoEstado }),
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al actualizar el ticket:", error);
    }
};

// 4. Eliminar un ticket (DELETE)
export const deleteTicket = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al borrar el ticket:", error);
    }
};