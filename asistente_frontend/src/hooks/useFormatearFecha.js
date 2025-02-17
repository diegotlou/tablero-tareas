import { useState, useEffect } from "react";

const useFormatearFecha = (fecha) => {
    const [fechaFormateada, setFechaFormateada] = useState("");

    useEffect(() => {
        var date = new Date(fecha);
        const timezoneOffset = new Date().getTimezoneOffset();
        const fechaTimeZone = new Date(date.getTime() + timezoneOffset * 60000);

        const opciones = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };

        setFechaFormateada(
            new Intl.DateTimeFormat("es-ES", opciones).format(fechaTimeZone)
        );
    }, [fecha]);

    return fechaFormateada;
};

export default useFormatearFecha;
