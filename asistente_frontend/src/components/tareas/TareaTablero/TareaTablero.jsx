import { useState } from "react";
import Tarea from "../Tarea/Tarea";
import EditarTarea from "../EditorTarea/EditorTarea";

function TareaTablero({ tarea, guardarEnTablero }) {
    const [editando, setEditando] = useState(false);

    const guardarEdicion = (tareaEditada) => {
        guardarEnTablero(tareaEditada);
        setEditando(false);
    };

    const cancelarEdicion = () => {
        setEditando(false);
    };

    return (
        <>
            {editando ? (
                <EditarTarea
                    tarea={tarea}
                    guardar={guardarEdicion}
                    cancelar={cancelarEdicion}
                />
            ) : (
                <Tarea tarea={tarea} editando={() => setEditando(true)} />
            )}
        </>
    );
}

export default TareaTablero;
