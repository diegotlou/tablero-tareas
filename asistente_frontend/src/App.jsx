import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio, Login, NotFound, Registro, Tablero } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function Registrar() {
    localStorage.clear();
    return <Registro />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route
                    path="/tablero"
                    element={
                        <ProtectedRoute>
                            <Tablero />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/registro" element={<Registrar />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
