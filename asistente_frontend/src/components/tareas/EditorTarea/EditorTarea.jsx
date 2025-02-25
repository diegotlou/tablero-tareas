import { useState } from "react";

function EditarTarea({ tarea, guardar, cancelar }) {
    const [titulo, setTitulo] = useState(tarea.titulo);
    const [contenido, setContenido] = useState(tarea.contenido);
    const [fechaVencimiento, setFechaVencimiento] = useState(
        tarea.fecha_vencimiento
    );
    const [progreso, setProgreso] = useState(tarea.progreso);

    const guardarEdicion = () => {
        guardar({
            ...tarea,
            titulo: titulo,
            contenido: contenido,
            fecha_vencimiento: fechaVencimiento,
            progreso: progreso,
        });
    };

    return (
        <>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="tarea-titulo-editable"
            />
            <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="tarea-contenido-editable"
            />
            <input
                type="datetime-local"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                className="tarea-fecha-editable"
            />
            <select
                value={progreso}
                onChange={(e) => setProgreso(e.target.value)}
                className="tarea-progreso-editable"
            >
                <option value="n">No iniciado</option>
                <option value="e">En proceso</option>
                <option value="c">Completado</option>
            </select>
            <div className="tarea-botones">
                <button onClick={guardarEdicion}>Guardar</button>
                <button onClick={cancelar}>Descartar</button>
            </div>
        </>
    );
}

export default EditarTarea;
