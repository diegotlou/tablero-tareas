import React from "react";
import "./Tarea.css";
import useFormatearFecha from "../../../hooks/useFormatearFecha";

function Tarea({ tarea }) {
    const fecha = useFormatearFecha(tarea.fecha_vencimiento);

    return (
        <div className="tarea-textos" id={"tarea-textos-" + tarea.id}>
            <p className="tarea-titulo" id={"tarea-titulo" + tarea.id}>
                {tarea.titulo}
            </p>
            <p className="tarea-contenido" id={"tarea-contenido-" + tarea.id}>
                {tarea.contenido}
            </p>
            <p
                className={`tarea-fecha ${
                    tarea.fecha_vencimiento &&
                    new Date().getTime() >
                        new Date(tarea.fecha_vencimiento).getTime()
                        ? "vencida"
                        : ""
                }`}
                id={"tarea-fecha-" + tarea.id}
            >
                {fecha}
            </p>
            <p className="tarea-progreso" id={"tarea-progreso-" + tarea.id}>
                {tarea.progreso}
            </p>
        </div>
    );
}

export default Tarea;
