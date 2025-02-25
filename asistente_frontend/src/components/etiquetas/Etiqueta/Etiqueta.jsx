import React from "react";
import { useEffect } from "react";
import "./Etiqueta.css";

function Etiqueta({ tareaId, etiqueta }) {
    useEffect(() => {
        agregaColor();
    }, [etiqueta.color]);

    const agregaColor = () => {
        const divEtiqueta = document.getElementById(
            "etiqueta-" + tareaId + "-" + etiqueta.id
        );
        if (etiqueta.color) divEtiqueta.style.backgroundColor = etiqueta.color;
    };

    return (
        <p className="etiqueta" id={"etiqueta-" + tareaId + "-" + etiqueta.id}>
            {etiqueta.nombre}
        </p>
    );
}

export default Etiqueta;
