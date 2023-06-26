const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listados de usuarios
module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
        orderBy: {
            ///ordenar por nombre
            Nombre: 'asc'
        }
    });
    response.json(usuarios);
}
//Obtener un usuario por id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuarios = await prisma.usuario.findUnique({
        where: {
            id: id
        }
    });
    response.json(usuarios);
}