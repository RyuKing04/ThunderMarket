const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado de productos
module.exports.get = async (request, response, next) => {
    const facturas = await prisma.factura.findMany({
        include:
        {
            facturaDetalle:true
        }

    });
    response.json(facturas);
}
//Obtener un producto por id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const facturas = await prisma.factura.findUnique({
        where: {
            id: id
        },
        include:
        {
            facturaDetalle:true
        }
    });
    response.json(facturas);
}
module.exports.getByiDUsuario=async (request, response, next) => {
    let idUsuario = parseInt(request.params.id);
    const facturas = await prisma.factura.findMany({
        where: {
            UsuarioID: idUsuario
        },
        include:
        {
            facturaDetalle:true
        }
    });
    response.json(facturas);
}

module.exports.getByIdVendedor=async (request, response, next) => {
    let id= parseInt(request.params.id);
    const facturas = await prisma.facturaDetalle.findMany({
        include:
        {
            producto:true,
        },
        where: {
            producto: {
                UsuarioID: id,
            },
        },
    });
    response.json(facturas);
}
