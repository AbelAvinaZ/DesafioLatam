// ***************************** PRIMER EJERCICIO ***************************
const img = document.querySelector(".primerEjercicio");

img.addEventListener("click", function () {
    if (img.classList.contains('primerEjercicio')) {
        img.classList.remove('primerEjercicio')
    } else {
        img.classList.add('primerEjercicio')
    };
})


// **************************** SEGUNDO EJERCICIO **************************
const parrafo = document.querySelector("#totalStickers");
const form = document.querySelector("form");
const input = document.querySelectorAll(".inputEjercicio");


form.addEventListener("submit", sumar);

let total = 0;

function sumar(e) {
    e.preventDefault();
    for (let i = 0; i < input.length; i++) {
        const valor = parseInt(input[i].value)
        total += valor;
        if (total > 0 && total < 11) {
            parrafo.textContent = `Llevas ${total} stickers`;
        } else {
            parrafo.textContent = "Selecciona mínimo 1 ó máximo 10";
        }
    }
    total = 0;
}



// *************************** TERCER EJERCICIO ***************************
const btnPass = document.querySelector("#pass");
const numero2 = document.querySelector(".numero2");
const numero1 = document.querySelector(".numero1");
const numero3 = document.querySelector(".numero3");
const heading = document.querySelector("h2");
const multipleSelects = document.querySelector("#numeros");


const pass1 = 911;
const pass2 = 714;

multipleSelects.addEventListener("submit", function (e) {
    e.preventDefault();
    let numeros = numero1.value + numero2.value + numero3.value;
    if(pass1 == numeros){
        heading.innerText = "Password 1 correcto";
    } else if(pass2 == numeros) {
        heading.innerText = "Password 2 correcto";
    } else {
        heading.innerText = "Password incorrecto";
    }
})

