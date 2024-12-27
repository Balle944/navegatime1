import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        company_name: "", // Nuevo campo para el nombre de la empresa
        role: "Empresa", // Rol predeterminado como Empresa
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("La contraseña debe tener al menos 8 caracteres e incluir letras y números.");
            return;
        }

        try {
            const response = await fetch("http://localhost/gestion_horario_api/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === "El correo ya está registrado") {
                    setError("El correo ya está registrado. Intenta con otro.");
                    return;
                }
                setSuccess(data.message);
                setFormData({ name: "", email: "", password: "", company_name: "", role: "Empresa" });
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.message || "Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("No se pudo conectar con el servidor. Revisa tu conexión.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Registro</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu nombre"
                    />
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
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de la empresa"
                    />
                    <button className="register-button" type="submit">Registrarse</button>
                </form>
                <a href="/login" className="register-link">¿Ya tienes una cuenta? Iniciar sesión</a>
            </div>
        </div>
    );
}

export default Register;
