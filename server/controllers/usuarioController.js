const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Crear un Usuario que pueda escoger dos roles o uno solo, y que tambien pueda el usuario registre la direccion como tengo en el schema
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(userData.password, salt);

  const selectedRoleIds = userData.selectedRoles || []; // Asegurarse de que selectedRoleIds sea un arreglo

  try {
    // Crear el usuario con sus roles asociados
    const user = await prisma.usuario.create({
      data: {
        Nombre: userData.Nombre,
        Apellido: userData.Apellido,
        Email: userData.Email,
        password: hashPassword,
        Empresa: userData.Empresa,
        Roles: {
          create: selectedRoleIds.map((roleId) => ({
            Rol: {
              connect: {
                id: roleId,
              },
            },
          })),
        },
      },
      include: {
        Roles: true,
        Direccion: true,
        MetodoDePago: true,
      },
    });

    response.status(201).json({
      success: true,
      message: 'Usuario creado',
      data: user,
    });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    response.status(500).json({ error: 'Ha ocurrido un error al crear el usuario.' });
  }
};




module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  // Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where: {
      Email: userReq.Email,
    },
    include: {
      Roles: true,
    },
  });

  // Si no se encuentra al usuario según su email
  if (!user) {
    return response.status(401).json({
      success: false,
      message: 'Usuario no registrado',
    });
  }

  // Verificar la contraseña
  const checkPassword = await bcrypt.compare(userReq.password, user.password);

  if (!checkPassword) {
    return response.status(401).json({
      success: false,
      message: 'Credenciales incorrectas',
    });
  } else {
    const payload = {
      Email: user.Email,
      Roles: user.Roles.map((role) => role.Descripcion),
    };
    // Generar el token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return response.status(200).json({
      success: true,
      message: 'Usuario logueado',
      data: {
        user,
        token,
      },
    });
  }
};


