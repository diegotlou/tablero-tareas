import { useState, useEffect } from "react";
import api from "../api";

const usePost = (url, data, mensajeOk, mensajeError) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.post(url, data)
            .then((res) => {
                if (res.status === 201) alert(mensajeOk);
                else alert(mensajeError);
                setStatus(res.status);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url, data, mensajeOk, mensajeError]);

    return { status, loading, error };
};

export default usePost;
