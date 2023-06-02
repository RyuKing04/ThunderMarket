import { PrismaClient } from "@prisma/client";
import { categoria } from "./seeds/categoria";
import { producto } from "./seeds/producto";
import { usuario } from "./seeds/usuario";
import { rol } from "./seeds/rol";
import { direccion } from "./seeds/direccion";
import { metodoDePago } from "./seeds/metodoDePago";
import { imagen } from "./seeds/image";
import { comentario } from "./seeds/comentario";
import { factura } from "./seeds/factura";
import { respuesta } from "./seeds/respuesta";
import { preguntas } from "./seeds/preguntas";
import { rolUsuario } from "./seeds/rolUsuario";
const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.createMany({
    data: categoria,
  });
  await prisma.producto.createMany({
    data: producto,
  });
  await prisma.usuario.createMany({
    data: usuario,
  });
  await prisma.rol.createMany({
    data: rol,
  });
  await prisma.direccion.createMany({
    data: direccion,
  });
  await prisma.metodoDePago.createMany({
    data: metodoDePago,
  });
  await prisma.imagen.createMany({
    data: imagen,
  });
  await prisma.comentario.createMany({
    data: comentario,
  });
  await prisma.factura.createMany({
    data: factura,
  });
  await prisma.respuesta.createMany({
    data: respuesta,
  });
  await prisma.preguntas.createMany({
    data: preguntas,
  });
  await prisma.rolUsuario.createMany({
    data: rolUsuario,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
