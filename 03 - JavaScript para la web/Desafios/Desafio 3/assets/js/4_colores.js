// ejercicio 3 (punto 1 y 2)

const primero = document.querySelector("#primero");

primero.addEventListener("click", function (e) {
    if (e.target.classList.contains("primero")) {
        e.target.style.backgroundColor = "black";
    }
});


// ejercicio 3 (punto 3) usando switch


const key = document.querySelector("#key");

let color;

document.addEventListener("keydown", cambiaFondo)

function cambiaFondo(e) {
    switch (e.key) {
        case "a":
            color = "pink";
            break;
        case "s":
            color = "orange";
            break;
        case "d":
            color = "blue";
            break;
        default:
            return;
    }
    key.style.backgroundColor = color;
}

//  ejercicio 3 (punto 4) usando if, le agregue que no se repita la creacion

const divPadre = document.querySelector("#segundo");

const repetido = {
    q: false,
    w: false,
    e: false,
}

document.addEventListener("keydown", function (e) {
    if (e.key === "q" && !repetido.q) {
        const caso1 = document.createElement("div");
        caso1.classList.add("q");
        divPadre.appendChild(caso1);
        repetido.q = true;
    } else if (e.key === "w" && !repetido.w) {
        const caso2 = document.createElement("div");
        caso2.classList.add("w");
        divPadre.appendChild(caso2);
        repetido.w = true;
    } else if (e.key === "e" && !repetido.e) {
        const caso3 = document.createElement("div");
        caso3.classList.add("e");
        divPadre.appendChild(caso3);
        repetido.e = true;
    }
})

