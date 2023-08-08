const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

///hazme un get de los roles y que esconda el rol de Admin
module.exports.getRoles = async (request, response, next) => {
  try {
    const roles = await prisma.rol.findMany({
      where: {
        Descripcion: {
          not: "Admin",
        },
      },
    });
    response.status(200).json({
      success: true,
      message: "Roles obtenidos",
      data: roles,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Ha ocurrido un error al obtener los roles.",
    });
  }
};
