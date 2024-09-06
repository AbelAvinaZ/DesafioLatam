const cantidadProducto = document.querySelector(".cantidad");
const totalPago = document.querySelector(".valor-total");
const btnSuma = document.querySelector("#suma");
const btnResta = document.querySelector("#resta");


let precio = 400000;
let cantidad = 1;

function sumaProducto() {
    precio += 400000;
    cantidad += 1;
    cantidadProducto.innerHTML = cantidad;
    let total = 400000 * cantidad;
    totalPago.innerHTML = total;
};

function restaProducto() {
    if (precio === 400000) {
        return precio;
    } else {
        precio -= 400000;
        cantidad -= 1;
        cantidadProducto.innerHTML = cantidad;
        let total = 400000 * cantidad;
        totalPago.innerHTML = total;
    }
}

btnSuma.addEventListener("click", sumaProducto);
btnResta.addEventListener("click", restaProducto);


