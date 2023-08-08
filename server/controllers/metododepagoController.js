const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//get metodo de pago por usuario
module.exports.getMetodoDePagoByUser = async (request, response, next) => {
    let idUsuario=parseInt(request.params.id);
    const metododepago = await prisma.metodoDePago.findMany({
       where: {
        UsuarioID:idUsuario
       },
    });
    response.json(metododepago);
    };

//get metodo de pago por id
module.exports.getMetodoDePagoById = async (request, response, next) => {
  let id = parseInt(request.params.id);
    const metododepago = await prisma.metodoDePago.findUnique({
        where: {
            id: id,
        },
        include: {
            Usuario: true,
        },
    });
    response.json(metododepago);
    }

//create metodo de pago
module.exports.create = async (request, response, next) => {
    let metodoDePago = request.body;
    
    const metododepago = await prisma.metodoDePago.create({
      data: {
        Nombre: metodoDePago.Nombre,
        Tipo: metodoDePago.Tipo,
        Proveedor: metodoDePago.Proveedor,
        NumeroDeCuenta: metodoDePago.NumeroDeCuenta,
        Expira: metodoDePago.Expira,
        UsuarioID: metodoDePago.UsuarioID,
      },    
    });
  
    response.json(metododepago);
  };