import { useState, useEffect } from "react";
import Etiqueta from "../Etiqueta/Etiqueta";
import "../../etiquetas/EtiquetasTarea/EtiquetasTarea.css";
import api from "../../../api";

function Etiquetas({ etiquetas, tarea, guardar }) {
    const [etiquetasArray, setEtiquetasArray] = useState([]);

    useEffect(() => {
        setEtiquetasArray(Object.values(etiquetas));
        console.log(Object.values(etiquetas));
        console.log(tarea.id);
    }, [etiquetas]);

    const actualizaEtiquetas = (etiquetaSeleccionada) => {
        if (
            !tarea.etiquetas.some(
                (etiquetaId) => etiquetaId === etiquetaSeleccionada.id
            )
        ) {
            const tareaEditada = { ...tarea };
            tareaEditada.etiquetas.push(etiquetaSeleccionada.id);
            api.patch(`organizador/tareas/${tarea.id}/`, tareaEditada)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Etiqueta agregada exitosamente :D");
                        guardar(tareaEditada);
                    } else {
                        alert("Hubo un problema intentelo de nuevo D:");
                    }
                })
                .catch((err) => alert(err));
        } else {
            alert("La tarea ya tiene esa etiqueta :0");
        }
        console.log(etiquetaSeleccionada.id);
    };

    return (
        <ul className="lista-etiquetas">
            {etiquetasArray.length > 0 &&
                etiquetasArray.map((etiqueta) => (
                    <li onClick={() => actualizaEtiquetas(etiqueta)}>
                        <Etiqueta
                            tareaId={`${tarea.id}.0`}
                            etiqueta={etiqueta}
                        />
                    </li>
                ))}
        </ul>
    );
}

export default Etiquetas;
