// ejercicio 2.2
const eje1 = document.querySelector(".eje1");

eje1.addEventListener("click", () => pintar(eje1));

function pintar(elemento) {
     elemento.style.backgroundColor = "yellow";
}

// ejercicion 2.3
const eje2 = document.querySelector("p");

pintar2 = function(color = "green") {
     eje2.style.color = color;
}

eje2.addEventListener("click", () => pintar2("yellow"));
