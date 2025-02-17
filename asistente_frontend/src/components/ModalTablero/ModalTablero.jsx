import Modal from "react-bootstrap/Modal";
import "./ModalTablero.css";

function ModalTablero({ mostrar, manejarCierre, titulo, children }) {
    return (
        <div className="modal-tablero">
            <Modal
                className="modal-tablero-contenedor"
                show={mostrar}
                onHide={manejarCierre}
            >
                <Modal.Header closeButton className="titulo">
                    <Modal.Title>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalTablero;
