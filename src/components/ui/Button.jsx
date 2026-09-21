/*Creación del boton, se crea con la misma intención del input y la misma estructura */
import { Children } from "react"; // La palabre Children se refiere a lo que
// va dentro de la etiqueta ej: <Buton>Guardar Tiket</Button>


export default Button ({Childrenhildren, type : "button", onClick}); {
    return (
        <button
            type={type} //En este caso es el valor por defecto del boton
            onClick={onClick} // La funcion que se ejecuta al dar clic
            style={{
                padding: '10px 16px',
                backgroundColor: '#2563eb', // Color boton
                color: '#ffffff',  // Color texto
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }} // El estilo 
        >
            {Children}
        </button>
    );
}
