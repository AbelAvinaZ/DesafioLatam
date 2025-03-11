const { registrar, leer } = require("./operaciones");

const argumentos = process.argv.slice(2);
const [operacion, ...datos] = argumentos;

if (operacion === "registrar") {
    const [nombre, edad, animal, color, enfermedad] = datos;
    registrar(nombre, edad, animal, color, enfermedad);
} else if (operacion === "leer") {
    leer();
} else {
    console.log("Operación no válida. Usa 'registrar' o 'leer'.");
}