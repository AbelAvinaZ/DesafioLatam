const { readFile, writeFile } = require("fs/promises");

const arg = process.argv.slice(2);
const [operacion, nombre, edad, animal, color, enfermedad] = arg;


const escribeDatos = async (datos) => {
    try {
        await writeFile("citas.json", JSON.stringify(datos));
    } catch (error) {
        console.log(error);
    }
};

const registrar = async (nombre, edad, animal, color, enfermedad) => {
    const citas = await leer();
    citas.push({ nombre, edad, animal, color, enfermedad });
    await escribeDatos(citas);
    console.log("datos agregados");
};

const leer = async () => {
    try {
        const citas = JSON.parse(await readFile("citas.json", "utf-8"));
        console.log(citas);
        return citas;
    } catch (error) {
        await writeFile("citas.json", JSON.stringify([]));
        return [];
    }
};


module.exports = { registrar, leer };