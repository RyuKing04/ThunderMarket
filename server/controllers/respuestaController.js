const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.createRespuesta = async (request, response, next) => {
    let respuesta = request.body;
    const newRespuesta = await prisma.respuesta.create({
        data: {
            Respuesta: respuesta.Respuesta,
       Usuario:{
              connect:{
                    id:respuesta.Usuario.UsuarioID
       }
        },
        Preguntas:{
            connect:{
                id:respuesta.Preguntas.PreguntasID
            }
        },
    },
    });
    response.json(newRespuesta);
}