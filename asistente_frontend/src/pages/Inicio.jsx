import { useNavigate } from "react-router-dom";

function Inicio() {
    const navegacion = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => navegacion("/login")}>Iniciar sesión</button>
        </>
    );
}

export default Inicio;
