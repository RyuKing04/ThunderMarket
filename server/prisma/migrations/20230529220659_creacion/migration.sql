-- CreateTable
CREATE TABLE `Rol` (
    `ID` INTEGER NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `ID` INTEGER NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Empresa` VARCHAR(191) NULL,
    `RolID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Provincia` VARCHAR(191) NOT NULL,
    `Canton` VARCHAR(191) NOT NULL,
    `Distrito` VARCHAR(191) NOT NULL,
    `CodigoPostal` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodoDePago` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Tipo` VARCHAR(191) NOT NULL,
    `Proveedor` VARCHAR(191) NOT NULL,
    `NumeroDeCuenta` VARCHAR(191) NOT NULL,
    `Expira` DATETIME(3) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Precio` DOUBLE NOT NULL,
    `Cantidad` INTEGER NOT NULL,
    `Estado` BOOLEAN NOT NULL,
    `CategoriaID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagen` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` VARCHAR(191) NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacturaDetalle` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Cantidad` INTEGER NOT NULL,
    `Subtotal` DOUBLE NOT NULL,
    `FacturaID` INTEGER NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Fecha` DATETIME(3) NOT NULL,
    `Total` DOUBLE NOT NULL,
    `Estado` BOOLEAN NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `DireccionID` INTEGER NOT NULL,
    `MetodoDePagoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentario` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ComentarioCliente` VARCHAR(191) NOT NULL,
    `CalificacionCliente` VARCHAR(191) NOT NULL,
    `ComentarioVendedor` VARCHAR(191) NOT NULL,
    `CalificacionVendedor` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `FacturaDetalleID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preguntas` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Pregunta` VARCHAR(191) NOT NULL,
    `IDRespuesta` INTEGER NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Respuesta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_RolID_fkey` FOREIGN KEY (`RolID`) REFERENCES `Rol`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoDePago` ADD CONSTRAINT `MetodoDePago_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_CategoriaID_fkey` FOREIGN KEY (`CategoriaID`) REFERENCES `Categoria`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagen` ADD CONSTRAINT `imagen_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacturaDetalle` ADD CONSTRAINT `FacturaDetalle_FacturaID_fkey` FOREIGN KEY (`FacturaID`) REFERENCES `Factura`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacturaDetalle` ADD CONSTRAINT `FacturaDetalle_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_DireccionID_fkey` FOREIGN KEY (`DireccionID`) REFERENCES `Direccion`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_MetodoDePagoID_fkey` FOREIGN KEY (`MetodoDePagoID`) REFERENCES `MetodoDePago`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_FacturaDetalleID_fkey` FOREIGN KEY (`FacturaDetalleID`) REFERENCES `FacturaDetalle`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_IDRespuesta_fkey` FOREIGN KEY (`IDRespuesta`) REFERENCES `Respuesta`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
