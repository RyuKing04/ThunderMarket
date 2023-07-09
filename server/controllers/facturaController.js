const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado de facturas
module.exports.get = async (request, response, next) => {
    const facturas = await prisma.factura.findMany({
        include:
        {
            facturaDetalle:true
        }

    });
    response.json(facturas);
}
//Obtener un factura por id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const facturas = await prisma.factura.findUnique({
        where: {
            id: id
        },
        include:
        {
            MetodoDePago:true,
            Direccion:true,
            facturaDetalle:{
                include: {
                    producto: true
                }
            }
        }
    });
    response.json(facturas);
}
module.exports.getByiDUsuario=async (request, response, next) => {
    let idUsuario = 5;
    const facturas = await prisma.facturaDetalle.findMany({
        where: {
            Factura : {
            UsuarioID: idUsuario
            }
        },
        include:
        {
            Factura:true,
            producto:true,
            
        }
    });
    response.json(facturas);
}

module.exports.getByIdVendedor=async (request, response, next) => {
    let id= 3;
    const facturas = await prisma.facturaDetalle.findMany({
         where: {
            producto: {
                UsuarioID: id,
            },
        },
        include:
        {
            producto:true,
        },
       
    });
    response.json(facturas);
}
