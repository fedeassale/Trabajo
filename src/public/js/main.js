console.log("Conectado a WebSocket");

const socket = io();

socket.emit("mensaje", "Cliente conectado");

// Escuchar el backend
socket.on("actualizarDatos", (data) => {
    console.log("Datos actualizados recibidos:", data);
    actualizarTabla(data.formularios, data.total);
});

// Función para actualizar la tabla con los datos recibidos
function actualizarTabla(formularios, total) {
    const tabla = document.querySelector("#tabla-datos");
    const tbody = document.createElement("tbody");

    formularios.forEach(formulario => {
        const fila = document.createElement("tr");
        fila.classList.add("fila-dato");
        fila.innerHTML = `
                    <td>${formulario.asunto}</td>
                    <td style="color: ${formulario.ingreso < 0 ? 'red' : 'green'}">${formulario.ingreso}</td>
                    <td>${formulario.categoria}</td>
                    <td><button class="delete-btn" data-id="${formulario._id}">❌</button></td>
        `;
        tbody.appendChild(fila);
    });

    // Agregar la fila del total
    const filaTotal = document.createElement("tr");
    filaTotal.classList.add("fila-total");
    filaTotal.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${total}</strong></td>
    <td></td>
    <td></td>
    `;
    tbody.appendChild(filaTotal);

    // Reemplazar el contenido de la tabla
    tabla.querySelectorAll(".fila-dato, .fila-total").forEach(row => row.remove());
    tabla.appendChild(tbody);

    Eliminar();
}

function Eliminar() {
    document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`/formulario/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {   
                alert('Gasto eliminado correctamente');
            } else {
                alert(data.error || 'Error al eliminar el gasto');
            }
        } catch (err) {
            console.error('Error al eliminar el gasto:', err);
            alert('Hubo un error al eliminar el gasto');
        }
    });
});
}