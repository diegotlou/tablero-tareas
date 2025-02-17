import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
    const [estaAutorizado, setEstaAutorizado] = useState(null);

    useEffect(() => {
        autenticazion().catch(() => setEstaAutorizado(false));
    }, []);

    const recargarToken = async () => {
        const refresToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/organizador/token/recargar/", {
                refresh: refresToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setEstaAutorizado(true);
            } else {
                setEstaAutorizado(false);
            }
        } catch (error) {
            console.log(error);
            setEstaAutorizado(false);
        }
    };

    const autenticazion = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setEstaAutorizado(false);
            return;
        }

        const descifrado = jwtDecode(token);
        const expiracionToken = descifrado.exp;
        const ahorita = Date.now() / 1000;

        if (expiracionToken < ahorita) {
            await recargarToken();
        } else {
            setEstaAutorizado(true);
        }
    };

    if (estaAutorizado === null) {
        return <div>Cargando...</div>;
    }

    return estaAutorizado ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
