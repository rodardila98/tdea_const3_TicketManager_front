
/*Creación del input para reutilizarlo en el formulario. En esta estructura estoy
especificando las props que puede llevar cada input, también la estructura del label
de cada campo y el estilo, esto con el fin de tener un código mas optimo y limpio
en el formulario */
export default function Input({label, type="text", placeholder, value, onChange, name}){
    return (
        <div style={{marginBottom: "10px"}}>
            {label && <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{label}</label>}
            
            <input 
        type={type} /*Tipo de dato que recibe*/
        name={name} /*El id del campo para diferenciar los input*/
        placeholder={placeholder} /*El texto de ejemplo dentro de la casilla a rellenar*/
        value={value} /*El texto que escribe el usuario*/
        onChange={onChange} /*La función que se dispara cada que se escribe o borra texto*/
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          color: '#334155',
          outline: 'none'
        }}
      />
            
        </div>
    );
     }