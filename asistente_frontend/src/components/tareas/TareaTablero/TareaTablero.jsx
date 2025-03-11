import { useState } from "react";
import Tarea from "../Tarea/Tarea";
import EditarTarea from "../EditorTarea/EditorTarea";
import api from "../../../api";
import "../TareaTablero/TareaTablero.css";
function TareaTablero({ tarea, borrarEnTablero, guardarEnTablero }) {
    const [editando, setEditando] = useState(false);

    const borrarTarea = (e) => {
        e.prevantDeafult;
        api.delete(`/organizador/tareas/${tarea.id}/`)
            .then((res) => {
                if (res.status === 204) alert("Tarea borrada correctamente :D");
                else alert("Hubo un problema al intentar borrar la tarea");
            })
            .catch((error) => alert(error));
        borrarEnTablero();
    };

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
                <>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    ></link>
                    <button class="boton-eliminar" onClick={borrarTarea}>
                        <i class="fa fa-trash"></i>
                    </button>
                    <Tarea tarea={tarea} editando={() => setEditando(true)} />
                </>
            )}
        </>
    );
}

export default TareaTablero;
