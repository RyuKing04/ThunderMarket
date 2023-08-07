const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Crear pregunta por el ID del producto
module.exports.getPreguntaProducto = async (request, response, next) => {
    let idProducto = parseInt(request.params.id);
    const preguntas = await prisma.preguntas.findMany({
        where: {
            ProductoID: idProducto,
        },
        orderBy: {
            ///ordenar por nombre
            Pregunta: "asc",
        },
        include: {
            Usuario: true,
            Producto: true,
            Respuesta: true,
        },
    });
    response.json(preguntas);
};


// Crear pregunta
module.exports.create = async (request, response, next) => {
    try {
        let pregunta = request.body;
        const newPregunta = await prisma.preguntas.create({
            data: {
                Pregunta: pregunta.Pregunta,
                UsuarioID: pregunta.UsuarioID,
                ProductoID: pregunta.ProductoID,
            }
        });
        response.json(newPregunta);
    } catch (error) {
        next(error);
    }
};
