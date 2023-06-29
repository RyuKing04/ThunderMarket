const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado de productos
module.exports.get = async (request, response, next) => {
    const productos = await prisma.producto.findMany({
        orderBy: {
            ///ordenar por nombre
            Nombre: 'asc'
        }
    });
    response.json(productos);
};
//Obtener un producto por id
module.exports.getById = async (request, response, next) => {
    let id = 2
    const productos = await prisma.producto.findUnique({
        where: {
            id:id
        },
        include: {
            Usuario: true,
            Preguntas: true,
            Categoria: true,
    },
});
    response.json(productos);
};
//Obtener un producto por el vendedor
module.exports.getProductoVendedor = async (request, response, next) => {
    let idVendedor=parseInt(request.params.id);
    const productos = await prisma.producto.findMany({
        where: {
           UsuarioID:idVendedor
        },
        orderBy: {
            ///ordenar por nombre
            Nombre: 'asc'
        }
    });
    response.json(productos);
}

