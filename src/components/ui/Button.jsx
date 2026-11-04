/* Creación del botón reutilizable */

export default function Button({ children, type = "button", onClick }) {
    return (
        <button
            type={type} // En este caso es el tipo de botón ('button' o 'submit')
            onClick={onClick} // La función que se ejecuta al dar clic
            style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0066cc', // Azul primario
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px'
            }}
        >
            {children} {/* Contenido dinámico dentro del botón */}
        </button>
    );
}
