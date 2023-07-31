const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = require("../controllers/upload");
const { parse } = require("path");
//Obtener listado de productos
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
      ///ordenar por nombre
      Nombre: "asc",
    },
    include: {
      Usuario: true,
      Categoria: true,
    },
  });
  response.json(productos);
};
//Obtener un producto por id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const productos = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      Usuario: true,
      Categoria: true,
      imagen: true,
      Preguntas: {
        include: {
          Respuesta: true,
        },
      },
    },
  });
  response.json(productos);
};
//Obtener un producto por el vendedor
module.exports.getProductoVendedor = async (request, response, next) => {
  let idVendedor = 3;
  const productos = await prisma.producto.findMany({
    where: {
      UsuarioID: idVendedor,
    },
    orderBy: {
      ///ordenar por nombre
      Nombre: "asc",
    },
    include: {
      Categoria: true,
    },
  });
  response.json(productos);
};

//crear producto
module.exports.create = async (request, response, next) => {
  try {
    let producto = request.body;
    const imagenes = request.files;

    // Convertir Precio a un número decimal
    const Precio = parseFloat(producto.Precio);
    // Convertir Cantidad a un número entero
    const Cantidad = parseInt(producto.Cantidad);
    // Convertir Estado a un booleano
    const Estado = producto.Estado = true;

    const newProducto = await prisma.producto.create({
      data: {
        Nombre: producto.Nombre,
        Precio: Precio,
        Cantidad: Cantidad,
        Estado: Estado,
        publicar: JSON.parse(producto.publicar),
        CategoriaID: parseInt(producto.Categorias),
        UsuarioID: parseInt(producto.UsuarioID),
      },
      include: {
        imagen: true,
      },
    });

    if (imagenes && imagenes.length > 0) {
      const imagenesData = imagenes.map((imagen) => ({
        imagen: imagen.filename,
        ProductoID: newProducto.id,
      }));

      await prisma.imagen.createMany({
        data: imagenesData,
      });
    }

    response.json(newProducto);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear el producto." });
  }
};

//actualizar producto
module.exports.update = async (request, response, next) => {
  let id = parseInt(request.params.id);
  let producto = request.body;
  const updateProductos = await prisma.producto.update({
    where: {
      id: id,
    },
    data: {
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Cantidad: producto.Cantidad,
      Estado: producto.Estado,
      Categoria: {
        connect: producto.Descripcion,
      },
      //imagen: {
      //  connect: { id: producto.imagen.imagenID }, // Si es que tienes un ID para la imagen
      //},
      Usuario: {
        connect: producto.UsuarioID,
      },
    },
  });
  response.json(updateProductos);
};
