const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const prism = new PrismaClient();
//---Archivos de rutas---
const productoRoutes = require('./routes/productoRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const preguntasRoutes = require('./routes/preguntasRoutes');
const respuestaRoutes = require('./routes/respuestaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const metododepagoRoutes = require('./routes/metododepagoRoutes');
const direccionesRoutes = require('./routes/direccionesRoutes');
// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
})
);
//---- Definir rutas ----
app.use('/productos/', productoRoutes);
app.use('/facturas/', facturaRoutes);
app.use('/usuarios/', usuarioRoutes);
app.use('/preguntas/', preguntasRoutes);
app.use('/respuestas/', respuestaRoutes);
app.use('/categorias/', categoriaRoutes);
app.use('/roles/', rolesRoutes);
app.use('/uploads/', express.static('uploads'));
app.use('/metododepago/', metododepagoRoutes);
app.use('/direcciones/', direccionesRoutes);
// Servidor
app.listen(port, () => { 
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});
