const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const comentarios = await prisma.comentario.findMany({
        orderBy: {
        Fecha: "asc",
        },
    });
    response.json(comentarios);
    }   

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const comentarios = await prisma.comentario.findUnique({
        where: {
        id: id,
        }
    });
    response.json(comentarios);
    }

module.exports.create = async (request, response, next) => {
    try{
        let comentario= request.body;

 const Newcomentario = await prisma.comentario.create({
        data: {
            ComentarioCliente: comentario.ComentarioCliente,
            CalificacionCliente: comentario.CalificacionCliente,
            CalificacionVendedor: comentario.CalificacionVendedor,
            ComentarioVendedor: comentario.ComentarioVendedor,
            UsuarioClienteID: comentario.UsuarioClienteID,
            UsuarioVendedorID: comentario.UsuarioVendedorID,
            FacturaDetalleID: comentario.FacturaDetalleID,
        },
    });
    response.json(Newcomentario);   
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al crear el comentario." });
}
}

// Obtener los mejores vendedores calificados (con promedio de calificación mayor a 3) PARA UN GRAFICO 
module.exports.getMejoresVendedoresCalificados = async (request, response, next) => {
    const mejoresVendedores = await prisma.comentario.findMany({
        where: {
            CalificacionVendedor: {
                gt: 3,
            },
        },
        select: {
            UsuarioVendedor: {
                select: {
                    id: true,
                    Nombre: true, // Asegúrate de tener el campo 'nombre' en tu modelo Usuario
                },
            },
            CalificacionVendedor: true,
        },
    });
    response.json(mejoresVendedores);
}