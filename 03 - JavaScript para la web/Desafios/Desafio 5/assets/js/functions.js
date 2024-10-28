const textoTareas = document.querySelector("#textoTareas");
const tareaInput = document.querySelector("#inputTareaNueva");

let tareas = [];

export function agregarTarea(e) {
    e.preventDefault();
    const tarea = tareaInput.value.trim(); //Uso de trim(): Se asegura de que no se agreguen tareas vacías al eliminar espacios en blanco.

    // se agrega al arreglo "tareas" un id y una "tarea" con el valor del input
    if (tarea) { // Validación para no agregar tareas vacías
        const nuevaTarea = {
            id: Date.now(),
            nuevaTarea: tarea,
            completada: false
        };
        tareas.push(nuevaTarea);
        tareaInput.value = "";
        imprimirTareas();
    }
}

export function eliminarTarea(e) {
    if (e.target.classList.contains("borrar-tarea")) {
        const tareaId = parseInt(e.target.getAttribute("data-id")); // Convertir a número
        tareas = tareas.filter(tarea => tarea.id !== tareaId); //eliminamos por el dataid
        imprimirTareas();
    }
}

export function manejarCheckbox(e) {
    if (e.target.classList.contains("check")) {
        const tareaId = parseInt(e.target.getAttribute("data-id"));
        const tareaObj = tareas.find(t => t.id === tareaId);
        tareaObj.completada = e.target.checked;
        imprimirTareas();
    }
}

export function imprimirTareas() {
    tablaTareas.innerHTML = tareas.map(tarea => `
        <tr>
            <td>${tarea.id}</td>
            <td class="${tarea.completada ? "text-success" : ""}">${tarea.nuevaTarea}</td>
            <td><input class="form-check-input check" type="checkbox" data-id="${tarea.id}" ${tarea.completada ? "checked" : ""}></td>
            <td><button class="btn btn-danger borrar-tarea" data-id="${tarea.id}"> X </button></td>
        </tr>
    `).join("");
    // join("") Une todas esas cadenas en una sola cadena continua, sin ningún separador entre ellas. Esto resulta en un bloque de HTML que se puede insertar directamente en innerHTML

    actualizarContador(); // Actualiza el contador al imprimir tareas
}

export function actualizarContador() {
    const totalRealizadas = tareas.filter(tarea => tarea.completada).length;
    textoTareas.innerHTML = `Total: <strong>${tareas.length}</strong><br>
                             Realizadas: <strong>${totalRealizadas}</strong>`;
}
