import { propiedades_alquiler, propiedades_venta } from "./variables.js";


document.addEventListener("DOMContentLoaded", () => {
    const divEnVenta = document.querySelector(".en-venta");
    const divEnAlquiler = document.querySelector(".en-alquiler");
    // aqui agrego otro parametro para seleccionar el div al que va en el html y no tenga error
    function agregarPropiedades(propiedades, divDestino) {
        propiedades.forEach(propiedad => {
            const { src, nombre, descripcion, ubicacion, habitaciones, costo, smoke, pets } = propiedad;

            const div = document.createElement("div");
            div.classList.add("col", "card", "cardDiv");
            div.innerHTML = `<img src="${src}" class="cardImg rounded">
                        <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text">${ubicacion}</p>
                        <p class="card-text">${habitaciones} Habitaciones</p>
                        <p class="card-text">$${costo}</p>
                    <p class="card-text">${smoke ? '<i class="text-success">Permitir fumar</i>' : '<i class="text-danger">No está permitido fumar</i>'}</p>
                    <p class="card-text">${pets ? '<i class="text-success">Permitidas mascotas</i>' : '<i class="text-danger">No se permiten mascotas</i>'}</p>
                        </div>`;
            divDestino.appendChild(div);
        });
    };

    // aqui lo agrego dependiendo el div que necesite
    if (divEnAlquiler) {
        agregarPropiedades(propiedades_alquiler, divEnAlquiler);
    }

    if (divEnVenta) {
        agregarPropiedades(propiedades_venta, divEnVenta);
    }
});