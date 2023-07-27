const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Crear pregunta
module.exports.create = async (request, response, next) => {
    let pregunta = request.body;
    const newPregunta = await prisma.preguntas.create({
        data: {
            Pregunta: pregunta.Pregunta,
       Usuario:{
              connect:{
                    id:pregunta.Usuario.UsuarioID
       }
        },
        Producto:{
            connect:{
                id:pregunta.Producto.ProductoID
            }
        },
    },
    });
    response.json(newPregunta);
}

//Crear respuesta
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