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
  let idVendedor =parseInt(request.params.id); 
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
    });

    if (imagenes && imagenes.length > 0) {
      const imagenesData = imagenes.map((imagen) => ({
        imagen:"http://localhost:3000/"+ imagen.destination + "/" + imagen.filename,
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
  try{
  let id = parseInt(request.body.id);
  let producto = request.body;
  const imagenes = request.files;

  // Convertir Precio a un número decimal
  const Precio = parseFloat(producto.Precio);
  // Convertir Cantidad a un número entero
  const Cantidad = parseInt(producto.Cantidad);
  // Convertir Estado a un booleano
  const Estado = producto.Estado = true;

  const updateProducto = await prisma.producto.update({
    where: {
      id: parseInt(id),
    },
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
        imagen:"http://localhost:3000/"+ imagen.destination + "/" + imagen.filename,
        ProductoID: updateProducto.id,
      }));

    await prisma.imagen.createMany({
      data: imagenesData,
    });
  }

  response.json(updateProducto);
} catch (error) {
  console.error(error);
  response.status(500).json({ error: "Error al crear el producto." });
}
};
