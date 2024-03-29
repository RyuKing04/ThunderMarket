const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const categorias = await prisma.categoria.findMany({
    orderBy: {
      Descripcion: "asc",
    },
  });
  response.json(categorias);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const categorias = await prisma.categoria.findUnique({
    where: {
      id: id,
    }
  });
  response.json(categorias);
};