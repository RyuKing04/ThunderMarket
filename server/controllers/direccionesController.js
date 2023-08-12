const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getDireccionesByUser = async (request, response, next) => {
    let idUsuario=parseInt(request.params.id);
    const direcciones = await prisma.direccion.findMany({
       where: {
        UsuarioID:idUsuario
       },
    });
    response.json(direcciones);
    }

module.exports.getDireccionById = async (request, response, next) => {
    let id = parseInt(request.params.id);
        const direccion = await prisma.direccion.findUnique({
            where: {
                id: id,
            },
            include: {
                Usuario: true,
            },
        });
        response.json(direccion);
        }

module.exports.create = async (request, response, next) => {
    let direccion = request.body;
    
    const direccionCreada = await prisma.direccion.create({
      data: {
      Provincia: direccion.Provincia,
        Canton: direccion.Canton,
        Distrito: direccion.Distrito,
        CodigoPostal: direccion.CodigoPostal,
        Direccion: direccion.Direccion,
        telefono: direccion.telefono,
        UsuarioID: direccion.UsuarioID,
        
      },    
    });
  
    response.json(direccionCreada);
  }