import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/navegatel.png"; // Asegúrate de que el logo esté en "src/assets/navegatel.png"

function App() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            {/* Logo */}
            <img src={logo} alt="Logo" style={styles.logo} />
            {/* Título */}
            <h1 style={styles.title}>Gestión Horaria</h1>
            {/* Mensaje */}
            <p style={styles.text}>API conectada con éxito</p>
            {/* Botones */}
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate("/register")}>
                    Registro
                </button>
                <button style={styles.button} onClick={() => navigate("/login")}>
                    Inicio de sesión
                </button>
            </div>
        </div>
    );
}

const styles = {
    body:{
        margin:"0",
        padding:"0",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "0", // Quita cualquier margen
        padding: "0",
        background: "linear-gradient(135deg,rgb(20, 20, 20),rgb(73, 69, 69))", // Fondo degradado
        color: "#ffffff", // Texto blanco
        textAlign: "center",
    },
    logo: {
        width: "200px", // Tamaño del logo
        marginBottom: "10px",
    },
    title: {
        fontSize: "3.5em", // Título más grande
        fontWeight: "500",
        marginBottom: "10px",
        color: "#C12728", // Rojo estilo Navegatel
    },
    text: {
        fontSize: "1.2em",
        marginBottom: "30px",
        color: "#ffffff",
    },
    buttonContainer: {
        display: "flex",
        gap: "15px", // Espaciado entre botones
    },
    button: {
        padding: "12px 30px",
        fontSize: "1.1em",
        fontWeight: "400",
        border: "2px solid #C12728", // Borde rojo
        borderRadius: "30px", // Bordes redondeados
        backgroundColor: "#C12728", // Fondo transparente
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#e74c3c", // Fondo rojo al hover
        color: "#ffffff", // Texto blanco al hover
    },
};

export default App;
