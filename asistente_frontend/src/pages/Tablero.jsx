import { useState, useEffect } from "react";
import "../styles/Tablero.css";
import {
    FormEtiqueta,
    FormTarea,
    ModalTablero,
    TareaTablero,
    Etiquetas,
} from "../components";
import { useGet } from "../hooks";

function Tablero() {
    const [tareas, setTareas] = useState([]);
    const [etiquetas, setEtiquetas] = useState({});
    const [tipoForm, setTipoForm] = useState(null);
    const [abrirModal, setAbrirModal] = useState(false);
    const apiGetTareas = useGet("/organizador/tareas/");
    const apiGetEtiquetas = useGet("/organizador/etiquetas/");

    useEffect(() => {
        if (apiGetTareas.data) setTareas(apiGetTareas.data);
        if (apiGetEtiquetas.data)
            setEtiquetas(
                apiGetEtiquetas.data.reduce((acc, etiqueta) => {
                    acc[etiqueta.id] = etiqueta;
                    return acc;
                }, {})
            );
    }, [apiGetTareas.data, apiGetEtiquetas.data]);

    // const borrarTarea = (id) => {
    //     api.delete(`/organizador/borrar/${id}`)
    //         .then((res) => {
    //             if (res.status === 204) alert("Tarea borrada con exito :D");
    //             else alert("Hubo un problema al intentar borrar la tarea D:");
    //         })
    //         .catch((error) => alert(error));
    //     getTareas();
    // };

    const mostrarForm = (nombreForm) => {
        setTipoForm(nombreForm);
        if (nombreForm === "Agregar tarea" || nombreForm === "Agregar etiqueta")
            setAbrirModal(true);
    };

    const guardarEnTablero = (tareaEditada) => {
        const tareasActualizadas = tareas.map((tarea) =>
            tarea.id === tareaEditada.id ? tareaEditada : tarea
        );
        setTareas(tareasActualizadas);
    };

    return (
        <div className="tablero">
            <ul className="tablero-navbar">
                <li className="navbar-elemento">
                    <h1 className="titulo-tablero">Tablero</h1>
                </li>
                <li className="navbar-elemento">
                    <button
                        className="boton-tablero boton-tarea"
                        onClick={() => mostrarForm("Agregar tarea")}
                    >
                        Crear tarea
                    </button>
                </li>
                <li className="navbar-elemento">
                    <button
                        className="boton-tablero boton-etiqueta"
                        onClick={() => mostrarForm("Agregar etiqueta")}
                    >
                        Crear etiqueta
                    </button>
                </li>
                <li>
                    <button
                        className="boton-tablero logout"
                        style={{ float: "right" }}
                        onClick={() => console.log(":0")}
                    >
                        Salir
                    </button>
                </li>
            </ul>
            <ModalTablero
                mostrar={abrirModal}
                manejarCierre={() => setAbrirModal(false)}
                titulo={tipoForm}
            >
                {abrirModal && tipoForm === "Agregar tarea" && (
                    <FormTarea
                        tareas={tareas}
                        setTareas={setTareas}
                        etiquetasUsuario={etiquetas}
                    />
                )}
                {abrirModal && tipoForm === "Agregar etiqueta" && (
                    <FormEtiqueta
                        etiquetas={etiquetas}
                        setEtiquetas={setEtiquetas}
                    />
                )}
            </ModalTablero>
            <h2>Tareas:</h2>
            <div className="tablero-tareas">
                {tareas.map((tarea) => (
                    <div
                        className="tarea-contenedor"
                        id={"tarea-contenedor-" + tarea.id}
                    >
                        <TareaTablero
                            tarea={tarea}
                            guardarEnTablero={guardarEnTablero}
                        />
                        <Etiquetas
                            etiquetas={etiquetas}
                            etiquetasId={tarea.etiquetas}
                            tareaId={tarea.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tablero;
