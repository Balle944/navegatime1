import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmpresaPanel from "./pages/EmpresaPanel";
import EmpleadoPanel from "./pages/EmpleadoPanel";
import MejorPanel from "./pages/MejorPanel";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/empresa" element={<EmpresaPanel />} />
                <Route path="/empleado" element={<EmpleadoPanel />} />
                <Route path="/mejor" element={<MejorPanel />} /> {/* Ruta especial */}

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
