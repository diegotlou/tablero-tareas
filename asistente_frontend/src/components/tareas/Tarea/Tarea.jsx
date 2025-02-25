import React from "react";
import "./Tarea.css";
import useFormatearFecha from "../../../hooks/useFormatearFecha";

function Tarea({ tarea, editando }) {
    const fecha = useFormatearFecha(tarea.fecha_vencimiento);

    return (
        <div className="tarea-textos" id={"tarea-textos-" + tarea.id}>
            <p
                className="tarea-titulo"
                id={"tarea-titulo" + tarea.id}
                onDoubleClick={editando}
            >
                {tarea.titulo}
            </p>
            <p
                className="tarea-contenido"
                id={"tarea-contenido-" + tarea.id}
                onDoubleClick={editando}
            >
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
                onDoubleClick={editando}
            >
                {fecha}
            </p>
            <p
                className="tarea-progreso"
                id={"tarea-progreso-" + tarea.id}
                onDoubleClick={editando}
            >
                {tarea.progreso}
            </p>
        </div>
    );
}

export default Tarea;
