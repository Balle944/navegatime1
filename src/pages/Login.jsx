import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // Manejar errores
    const [success, setSuccess] = useState(""); // Mensaje de éxito
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar mensajes previos
        setSuccess("");

        try {
            const response = await fetch("http://localhost/gestion_horario_api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data); // Verificar la respuesta

            if (response.ok && data.user) {
                setSuccess(data.message || "Inicio de sesión exitoso");

                // Guardar información del usuario en localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirigir según el rol del usuario
                if (parseInt(data.user.role_id) === 2) {
                    navigate("/empresa"); // Ruta para la empresa
                } else if (parseInt(data.user.role_id) === 3) {
                    navigate("/empleado"); // Ruta para el empleado
                } else {
                    setError("Rol no reconocido. Contacta al administrador.");
                }
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
                {success && <p style={{ color: "green" }}>{success}</p>} {/* Mostrar mensaje de éxito */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu contraseña"
                    />
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
                <a href="/register" className="login-link">¿No tienes una cuenta? Regístrate</a>
            </div>
        </div>
    );
}

export default Login;
