/*Creación del boton, se crea con la misma intención del input y la misma estructura */
import { Children } from "react"; // La palabre Children se refiere a lo que
// va dentro de la etiqueta ej: <Buton>Guardar Tiket</Button>


export default Button ({Childrenhildren, type : "button", onClick}); {
    return (
        <button
            type={type} //En este caso es el valor por defecto del boton
            onClick={onClick} // La funcion que se ejecuta al dar clic
            style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0066cc', // Azul primario de tu mockup
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
            }} // El estilo 
        >
            {Children}
        </button>
    );
}
