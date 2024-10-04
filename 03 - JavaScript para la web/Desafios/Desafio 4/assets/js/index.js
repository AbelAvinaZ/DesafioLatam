import { propiedades_alquiler, propiedades_venta } from "./variables.js";


const divEnVenta = document.querySelector(".en-venta");
const divEnAlquiler = document.querySelector(".en-alquiler");


function agregarPropiedades(propiedades) {
    let propiedadesVisibles = 0; // para realizar mi conteo de divs

    // uso un forEach (en vez de un for of) para iterar sobre cada 1 de las propiedades y despues creo las columnas donde se muestra la info
    propiedades.forEach(propiedad => {
        if (propiedadesVisibles >= 3) return; //si ya agregaste #, hazlo parar
        const { src, nombre, descripcion, ubicacion, habitaciones, costo, smoke, pets } = propiedad;

        // a smoke y pet les agrego un operador condicional para que dependiendo su valor salga su msj
        const div = document.createElement("div");
        div.classList.add("col", "card", "cardDiv");
        div.innerHTML = `<img src="${src}" class="cardImg rounded">
                    <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="text-truncate card-text">${descripcion}</p>
                    <p class="card-text">${ubicacion}</p>
                    <p class="card-text">${habitaciones} Habitaciones</p>
                    <p class="card-text">$${costo}</p>
                    <p class="card-text">${smoke ? '<i class="text-success">Permitir fumar</i>' : '<i class="text-danger">No está permitido fumar</i>'}</p>
                    <p class="card-text">${pets ? '<i class="text-success">Permitidas mascotas</i>' : '<i class="text-danger">No se permiten mascotas</i>'}</p>
                    </div>`;

        // esto lo hago para que los divs se creen en su div correspondiente
        if (propiedades === propiedades_alquiler) {
            divEnAlquiler.appendChild(div);
        } else if (propiedades === propiedades_venta) {
            divEnVenta.appendChild(div);
        }
        propiedadesVisibles++;
    });
};

agregarPropiedades(propiedades_alquiler);
agregarPropiedades(propiedades_venta);





// esta seria una forma mas larga
// for (let alquiler of propiedades_alquiler) {
//     const div = document.createElement("div");
//     div.classList.add("col", "card", "cardDiv");
//     div.innerHTML = `<img src="${alquiler.src}" class="cardImg rounded">
//                     <div class="card-body">
//                     <h5 class="card-title">${alquiler.nombre}</h5>
//                     <p class="text-truncate card-text">${alquiler.descripcion}</p>
//                     <p class="card-text">${alquiler.ubicacion}</p>
//                     <p class="card-text">${alquiler.habitaciones}</p>
//                     <p class="card-text">$${alquiler.costo}</p>
//                     <p class="card-text">${alquiler.smoke}</p>
//                     <p class="card-text">${alquiler.pets}</p>
//                     </div>`;

//     divEnAlquiler.appendChild(div);
// }


// for (let venta of propiedades_venta) {
//     const div = document.createElement("div");
//     div.classList.add("col", "card", "cardDiv");
//     div.innerHTML = `<img src="${venta.src}" class="cardImg rounded">
//                     <div class="card-body">
//                     <h5 class="card-title">${venta.nombre}</h5>
//                     <p class="text-truncate card-text">${venta.descripcion}</p>
//                     <p class="card-text">${venta.ubicacion}</p>
//                     <p class="card-text">${venta.habitaciones}</p>
//                     <p class="card-text">$${venta.costo}</p>
//                     <p class="card-text">${venta.smoke}</p>
//                     <p class="card-text">${venta.pets}</p>
//                     </div>`;
//     divEnVenta.appendChild(div);
// }
