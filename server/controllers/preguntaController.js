const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
