const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.createRespuesta = async (request, response, next) => {
    let respuesta = request.body;
    const newRespuesta = await prisma.respuesta.create({
        data: {
            Respuesta: respuesta.Respuesta,
            UsuarioID: respuesta.UsuarioID,
            IDPregunta: respuesta.IDPregunta,

    },
    });
    response.json(newRespuesta);
}