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

