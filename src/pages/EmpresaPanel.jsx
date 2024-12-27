import React, { useState, useEffect } from "react";

function EmpresaPanel() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Empleado",
    });
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");
    const [companyName, setCompanyName] = useState("");
    const companyId = JSON.parse(localStorage.getItem("user"))?.id;

    // Cargar datos iniciales
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.company_name) {
            setCompanyName(user.company_name);
        }
        fetchEmployees();
    }, []);

    // Obtener empleados desde el servidor
    const fetchEmployees = async () => {
        try {
            const response = await fetch(`http://localhost/gestion_horario_api/get_employees.php?company_id=${companyId}`);
            if (!response.ok) throw new Error(`Error al obtener empleados: ${response.statusText}`);
            const data = await response.json();
            setEmployees(data.employees || []);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
            setMessage("Error al cargar la lista de empleados.");
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.role || !companyId) {
            setMessage("Todos los campos son obligatorios.");
            return;
        }

        const roleId = formData.role === "Encargado" ? 4 : 3;

        try {
            const response = await fetch("http://localhost/gestion_horario_api/register_employee.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role: roleId,
                    company_id: companyId,
                }),
            });

            const text = await response.text(); // Leer la respuesta cruda
            console.log("Respuesta del servidor (RAW):", text);

            try {
                const data = JSON.parse(text); // Intentar analizar como JSON
                if (!response.ok) throw new Error(data.message || "Error del servidor.");
                setMessage(data.message || "Empleado registrado con éxito.");
                fetchEmployees(); // Recargar lista de empleados
            } catch (jsonError) {
                console.error("Error al analizar JSON:", jsonError, text);
                setMessage("Respuesta inválida del servidor.");
            }
        } catch (error) {
            console.error("Error al registrar empleado:", error);
            setMessage("Error al registrar el empleado.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Panel de Empresa</h1>
            <h2>Bienvenido, {companyName}</h2>
            <h2>Registrar Trabajador</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nombre del trabajador"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Correo electrónico"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Contraseña"
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Empleado">Empleado</option>
                    <option value="Encargado">Encargado</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Lista de Trabajadores</h2>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay empleados registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmpresaPanel;
