import { agregarTarea, eliminarTarea, manejarCheckbox } from "./assets/js/functions.js";

const form = document.querySelector("#infoTareas");
const tablaTareas = document.querySelector("#tablaTareas");



cargarEventListeners();

function cargarEventListeners() {
    // agregar las tareas
    form.addEventListener("submit", agregarTarea);
    // eliminar tareas
    tablaTareas.addEventListener("click", eliminarTarea);
    // checar si estan realizadas
    tablaTareas.addEventListener("change", manejarCheckbox);
}


