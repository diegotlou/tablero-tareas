import { useState, useEffect } from "react";
import api from "../api";

const useGet = (url) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.get(url)
            .then((res) => {
                setStatus(res.status);
                setData(res.data);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, status, loading, error };
};

export default useGet;
