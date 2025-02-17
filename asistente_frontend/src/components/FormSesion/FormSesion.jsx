import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants.js";
import "./FormSesion.css";

function FormSesion({ ruta, metodo }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [cargando, setCargando] = useState(false);
    const navegacion = useNavigate();
    const titulo = metodo === "login" ? "Inicia sesion" : "Registrate";
    const [errores, setErrores] = useState({});

    const manejarEnvio = async (e) => {
        setCargando(true);
        e.preventDefault();
        setErrores({});
        try {
            if (metodo === "login") {
                const res = await api.post(ruta, { username, password });
                const accessAux = res.data.access;
                const refreshAux = res.data.refresh;
                localStorage.setItem(ACCESS_TOKEN, accessAux);
                localStorage.setItem(REFRESH_TOKEN, refreshAux);
                navegacion("/tablero");
            } else {
                await api.post(ruta, { username, email, password, password2 });
                navegacion("/login");
            }
        } catch (error) {
            if (error.response) {
                setErrores(error.response.data);
                if (errores.detail) {
                    console.log(errores.detail);
                }
            } else {
                setErrores({
                    general: "Ocurrió un error. Intenta de nuevo más tarde.",
                });
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio} className="form-contenedor">
            <h1>{titulo}</h1>
            {errores.general && <p className="form-error">{errores.general}</p>}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
            />
            {errores.username && (
                <div className="form-error">{errores.username}</div>
            )}
            {metodo === "registro" && (
                <>
                    <input
                        className="form-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electronico"
                    />
                    {errores.email && (
                        <div className="form-error">{errores.email}</div>
                    )}
                </>
            )}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrasena"
            />
            {errores.password && (
                <p className="form-error">{errores.password}</p>
            )}
            {metodo === "registro" && (
                <input
                    className="form-input"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirma contrasena"
                />
            )}
            {errores.password2 && (
                <div className="form-error">{errores.password2}</div>
            )}
            {errores.detail && (
                <p className="form-error">
                    Credenciales incorrectas o el usuario no ha sido registrado.
                </p>
            )}
            <button className="form-boton" type="submit">
                Enviar
            </button>
        </form>
    );
}

export default FormSesion;
