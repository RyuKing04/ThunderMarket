const { PrismaClient } = require("@prisma/client");

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
