const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado de facturas
module.exports.get = async (request, response, next) => {
  const facturas = await prisma.factura.findMany({
    include: {
      facturaDetalle: true,
    },
  });
  response.json(facturas);
};
//Obtener un factura por id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const facturas = await prisma.factura.findUnique({
    where: {
      id: id,
    },
    include: {
      MetodoDePago: true,
      Direccion: true,
      facturaDetalle: {
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(facturas);
};
module.exports.getByiDUsuario = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  const facturas = await prisma.factura.findMany({
    where: {
      UsuarioID: idUsuario,
    },
    include: {
      facturaDetalle: true,
    },
  });
  response.json(facturas);
};

module.exports.getByIdVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const facturas = await prisma.facturaDetalle.findMany({
    where: {
      producto: {
        UsuarioID: id,
      },
    },
    include: {
      producto: true,
    },
  });
  response.json(facturas);
};

//Crear un factura
module.exports.create = async (request, response, next) => {
  let factura = request.body;
  try {
    const facturaCreada = await prisma.factura.create({
      data: {
        Fecha: new Date(),
        Total: factura.Total,
        Estado: "Pendiente",
        UsuarioID: factura.UsuarioID,
        DireccionID: factura.DireccionID,
        MetodoDePagoID: factura.MetodoDePagoID,
        facturaDetalle: {
          create: factura.facturaDetalle.map(detalle => ({
            ...detalle,
            Estado: "Pendiente",
          })),
        },
      },
    });

    response.json(facturaCreada);
  } catch (error) {
    console.log(error);
    response.json(error);
  }
};

module.exports.updateEstado = async (request, response, next) => {
  let factura = request.body;
  try {
    const facturaCreada = await prisma.facturaDetalle.update({
      where: {
        id: factura.id,
      },
      data: {
        Estado: factura.Estado,
      },
    });
    const facturaNormal= await prisma.factura.findUnique({
      where: {
        id: facturaCreada.FacturaID,
      },
      include: {
        facturaDetalle: true,
      },

    });
    let detalles = facturaNormal.facturaDetalle;
    let estado="Entregado";
    for (let i = 0; i < detalles.length; i++) {
      if(detalles[i].Estado=="Pendiente"){
        estado="Pendiente";
        break;
      }
    }
const facturaActualizada = await prisma.factura.update({
  where: {
    id: facturaCreada.FacturaID,
  },
  data: {
    Estado: estado,
  },
});

    response.json(facturaCreada);
  } catch (error) {
    console.log(error);
    response.json(error);
  }
};

module.exports.getProductosVendidosDelMes = async (request, response, next) => {
  let mes= +(request.params.mes);
  const result= await prisma.$queryRaw
  (Prisma.sql `SELECT p.Nombre, SUM(fd.Cantidad) as CantidadVendida FROM FacturaDetalle fd
  INNER JOIN Producto p ON fd.ProductoID=p.id
  INNER JOIN Factura f ON fd.FacturaID=f.id
  WHERE MONTH(f.Fecha)=${mes}
  GROUP BY p.Nombre
  ORDER BY CantidadVendida DESC`);
  response.json(result);
};


//get productos mas vendido del vendedor
module.exports.getProductosMasVendidosVendedor=async(request,response,next)=>{
  let id= +(request.params.id);
  const result= await prisma.$queryRaw
  (Prisma.sql `SELECT p.Nombre, SUM(fd.Cantidad) as CantidadVendida FROM FacturaDetalle fd
  INNER JOIN Producto p ON fd.ProductoID=p.id
  INNER JOIN Factura f ON fd.FacturaID=f.id
  WHERE p.UsuarioID=${id}
  GROUP BY p.Nombre
  ORDER BY CantidadVendida DESC`);
  response.json(result);
}


