import { useState } from "react";
import api from "../../api";

function FormEtiqueta({ etiquetas, setEtiquetas }) {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("#FFFFFF");

    const crearEtiqueta = (e) => {
        e.preventDefault();
        api.post("/organizador/etiquetas/", {
            nombre,
            color,
        })
            .then((res) => {
                if (res.status === 201) alert("Etiqueta agregada :D");
                else alert("Error al crear etiqueta D:");
                setEtiquetas({ ...etiquetas, [res.data.id]: res.data });
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={crearEtiqueta}>
            <label htmlFor="nombre">Nombre de la etiqueta</label>
            <br />
            <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <label htmlFor="color">Color</label>
            <br />
            <input
                type="color"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <br />
            <input type="submit" value="Crear etiqueta"></input>
        </form>
    );
}

export default FormEtiqueta;
