import { useState } from "react";
import Etiqueta from "../Etiqueta/Etiqueta";
import Etiquetas from "../Etiquetas/Etiquetas";
import ModalTablero from "../../ModalTablero/ModalTablero";
import "./EtiquetasTarea.css";

function EtiquetasTarea({ etiquetas, etiquetasId, tarea, guardarEnTablero }) {
    const [abrirEtiquetas, setAbrirEtiquetas] = useState(false);

    return (
        <>
            <ul className="lista-etiquetas" id={"etiquetas-tarea-" + tarea.id}>
                {etiquetasId.length > 0 &&
                    etiquetasId.map(
                        (etiquetaId) =>
                            etiquetas[etiquetaId] && (
                                <li
                                    className="elemento-etiqueta"
                                    id={
                                        "etiqueta-" +
                                        etiquetaId +
                                        "-tarea-" +
                                        tarea.id
                                    }
                                >
                                    <Etiqueta
                                        tareaId={tarea.id}
                                        etiqueta={etiquetas[etiquetaId]}
                                    />
                                </li>
                            )
                    )}
            </ul>
            <button
                className="boton-etiquetas"
                onClick={() => setAbrirEtiquetas(true)}
            />
            <ModalTablero
                mostrar={abrirEtiquetas}
                manejarCierre={() => setAbrirEtiquetas(false)}
                titulo={"Etiquetas"}
            >
                <Etiquetas
                    etiquetas={etiquetas}
                    tarea={tarea}
                    guardar={guardarEnTablero}
                />
            </ModalTablero>
        </>
    );
}

export default EtiquetasTarea;
