const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado de productos
module.exports.get = async (request, response, next) => {
    const productos = await prisma.producto.findMany({
        orderBy: {
            ///ordenar por nombre
            Nombre: 'asc'
        },
        include: {
            Usuario: true,
            Categoria: true,
        },
    });
    response.json(productos);
};
//Obtener un producto por id
module.exports.getById = async (request, response, next) => {
    let id =  parseInt(request.params.id);
    const productos = await prisma.producto.findUnique({
        where: {
            id:id
        },
        include: {
            Usuario: true,
            Categoria: true,
            imagen: true,
            Preguntas:{
                include:{
                    Respuesta:true,
                },
            },
            
    },
});
    response.json(productos);
};
//Obtener un producto por el vendedor
module.exports.getProductoVendedor = async (request, response, next) => {
    let idVendedor=3;
    const productos = await prisma.producto.findMany({
        where: {
           UsuarioID:idVendedor
        },
        orderBy: {
            ///ordenar por nombre
            Nombre: 'asc'
        },
        include: {
            Categoria: true,
        },
    });
    response.json(productos);
}

//crear producto
module.exports.create = async (request, response, next) => {
    let producto = request.body;
    const newProductos = await prisma.producto.create({
        data: {
            Nombre: producto.Nombre,
            Precio: producto.Precio,
            Cantidad: producto.Cantidad,
            Estado: producto.Estado,
            Categoria:{
                connect:producto.Descripcion,
            },
            imagen:{
                connect:producto.imagen,
        }
        }
    });
    response.json(newProductos);
}
//actualizar producto
module.exports.update = async (request, response, next) => {
    let id = parseInt(request.params.id);
    let producto = request.body;
    const updateProductos = await prisma.producto.update({
        where: {
            id: id
        },
        data: {
            Nombre: producto.Nombre,
            Precio: producto.Precio,
            Cantidad: producto.Cantidad,
            Estado: producto.Estado,
            Categoria:{
                connect:producto.Descripcion,
            }
        }
    });
    response.json(updateProductos);
}


