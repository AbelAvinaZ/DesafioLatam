const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error en el servidor" });
};

export default errorHandler;