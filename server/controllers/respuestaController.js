const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.createRespuesta = async (request, response, next) => {
    let respuesta = request.body;
    const newRespuesta = await prisma.respuesta.create({
        data: {
            Respuesta: respuesta.Respuesta,
            UsuarioID: pregunta.UsuarioID,
            PreguntasID: pregunta.PreguntasID,

    },
    });
    response.json(newRespuesta);
}