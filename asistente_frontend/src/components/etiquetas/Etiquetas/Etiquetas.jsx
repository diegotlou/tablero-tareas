import Etiqueta from "../Etiqueta/Etiqueta";
import "../Etiquetas/Etiquetas.css";

function Etiquetas({ etiquetas, etiquetasId, tareaId }) {
    return (
        <ul className="lista-etiquetas" id={"etiquetas-tarea-" + tareaId}>
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
                                    tareaId
                                }
                            >
                                <Etiqueta
                                    tareaId={tareaId}
                                    etiqueta={etiquetas[etiquetaId]}
                                />
                            </li>
                        )
                )}
        </ul>
    );
}

export default Etiquetas;
