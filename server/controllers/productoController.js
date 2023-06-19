const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado de productos
module.exports.list = async (req, res) => {
    const productos = await prisma.producto.findMany({
        orderBy: {
            id: 'desc'
        }
    });
    res.json(productos);
};

