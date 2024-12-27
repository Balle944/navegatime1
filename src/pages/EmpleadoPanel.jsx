import React, { useState } from "react";

function EmpleadoPanel() {
    const [tiempo, setTiempo] = useState(0);
    const [corriendo, setCorriendo] = useState(false);

    const iniciarSesion = async () => {
        try {
            const response = await fetch("http://localhost/gestion_horario_api/workSessionHandler.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    action: "start",
                    employee_id: 1,
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Sesión iniciada correctamente");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#C12728" }}>
            <h1>SOY EMPLEADO</h1>
            <h2>Tiempo de trabajo: {tiempo} segundos</h2>
            <button onClick={iniciarSesion} style={{ margin: "5px", padding: "10px" }}>
                Iniciar Sesión
            </button>
        </div>
    );
}

export default EmpleadoPanel;
