const API_URL = "http://localhost/gestion_horario_api";

export async function fetchMessage() {
    const response = await fetch(`${API_URL}/index.php`);
    const data = await response.json();
    return data;
}
