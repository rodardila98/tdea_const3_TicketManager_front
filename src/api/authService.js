// Servicio para autenticación y manejo de sesión JWT
const API_URL = "http://localhost:3001/usuarios";

// 1. Iniciar sesión y guardar token en localStorage
export const login = async (email, password) => {
    const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al iniciar sesión');
    }

    if (datos.token) {
        localStorage.setItem('token', datos.token);
        localStorage.setItem('usuario', JSON.stringify(datos.user));
    }

    return datos;
};

// 2. Registrar un nuevo usuario (el servidor le asigna rol 'agente')
export const register = async (nombre, email, password) => {
    const respuesta = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        const mensajeError = datos.detalles ? datos.detalles.join(', ') : (datos.error || 'Error al registrar usuario');
        throw new Error(mensajeError);
    }

    return datos;
};

// 3. Cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};

// 4. Obtener los datos del usuario logueado desde localStorage
export const getUsuarioActual = () => {
    const usuarioStr = localStorage.getItem('usuario');
    try {
        return usuarioStr ? JSON.parse(usuarioStr) : null;
    } catch {
        return null;
    }
};

// 5. Obtener el token JWT actual
export const getToken = () => {
    return localStorage.getItem('token');
};
