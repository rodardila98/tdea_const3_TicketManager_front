
/*Creación del input para reutilizarlo en el formulario. En esta estructura estoy
especificando las props que puede llevar cada input, también la estructura del label
de cada campo y el estilo, esto con el fin de tener un código mas optimo y limpio
en el formulario */
export default function Input({type="text", placeholder, value, onChange, name}){
    return (
        <div style={{marginBottom: "10px"}}>
            {label && <label style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>}
            
            <input 
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
            
        </div>
    );
     }