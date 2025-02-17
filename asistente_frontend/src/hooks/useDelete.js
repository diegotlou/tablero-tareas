import { useState, useEffect } from "react";
import api from "../api";

const useDelete = (url, id, mensajeOk, mensajeError) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.delete(`${url}/${id}`)
            .then((res) => {
                if (res.status === 204) alert(mensajeOk);
                else alert(mensajeError);
                setStatus(res.status);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url, id, mensajeOk, mensajeError]);

    return { status, loading, error };
};

export default useDelete;
