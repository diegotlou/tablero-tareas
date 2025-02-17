import { useState } from "react";

function EditarTarea({ tarea, onSave, onCancel }) {
    const [titulo, setTitulo] = useState(tarea.titulo);
    const [contenido, setContenido] = useState(tarea.contenido);
    const [fechaVencimiento, setFechaVencimiento] = useState(
        tarea.fecha_vencimiento
    );

    const handleSave = () => {
        onSave({
            ...tarea,
            titulo,
            contenido,
            fecha_vencimiento: fechaVencimiento,
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
            <div className="tarea-botones">
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onCancel}>Descartar</button>
            </div>
        </>
    );
}

export default EditarTarea;
