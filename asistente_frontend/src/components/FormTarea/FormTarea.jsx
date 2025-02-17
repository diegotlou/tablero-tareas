import { useState } from "react";
import api from "../../api";

function FormTarea({ tareas, setTareas, etiquetas }) {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [fecha_vencimiento, setFecha] = useState("");
    const [progreso, setProgreso] = useState("n");
    const [etiquetasTarea, setEtiquetasTarea] = useState([]);

    const crearTarea = (e) => {
        e.preventDefault();
        api.post("/organizador/", {
            titulo,
            contenido,
            fecha_vencimiento,
            progreso,
            etiquetasTarea,
        })
            .then((res) => {
                if (res.status === 201) alert("Tarea creada correctamente :D");
                else alert("Hubo un problema intentelo de nuevo D:");
                setTareas([...tareas, res.data]);
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={crearTarea}>
            <label htmlFor="titulo">Título:</label>
            <br />
            <input
                type="text"
                id="titulo"
                name="titulo"
                required
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
            />
            <br />
            <label htmlFor="contenido">Contenido:</label>
            <br />
            <textarea
                id="contenido"
                name="contenido"
                required
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
            ></textarea>
            <br />
            <label htmlFor="fechaVencimiento">Fecha de vencimiento:</label>
            <br />
            <input
                type="datetime-local"
                id="fechaVencimiento"
                name="fechaVencimiento"
                onChange={(e) => setFecha(e.target.value)}
                value={fecha_vencimiento}
            />
            <br />
            <label htmlFor="progreso">Progreso:</label>
            <br />
            <select
                id="progreso"
                name="progreso"
                value={progreso}
                onChange={(e) => setProgreso(e.target.value)}
            >
                <option value="n" id="progreso-n">
                    No iniciado
                </option>
                <option value="e" id="progreso-e">
                    En proceso
                </option>
                <option value="c" id="progreso-c">
                    Completado
                </option>
            </select>
            <br />
            <label htmlFor="etiquetas">Etiquetas:</label>
            <br />
            <select
                multiple
                id="etiquetas"
                onChange={(e) =>
                    setEtiquetasTarea(
                        Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                        )
                    )
                }
            >
                {Object.entries(etiquetas).map(([id, value]) => (
                    <option key={"etiqueta-" + id} value={id}>
                        {value.nombre}
                    </option>
                ))}
            </select>
            <br />
            <input type="submit" value="Enviar"></input>
        </form>
    );
}

export default FormTarea;
