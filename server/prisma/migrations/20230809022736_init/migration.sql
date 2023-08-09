-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `Empresa` VARCHAR(191) NULL,
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolUsuario` (
    `RolID` INTEGER NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`RolID`, `UsuarioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Provincia` VARCHAR(191) NOT NULL,
    `Canton` VARCHAR(191) NOT NULL,
    `Distrito` VARCHAR(191) NOT NULL,
    `CodigoPostal` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodoDePago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Tipo` VARCHAR(191) NOT NULL,
    `Proveedor` VARCHAR(191) NOT NULL,
    `NumeroDeCuenta` VARCHAR(191) NOT NULL,
    `Expira` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Precio` DECIMAL(10, 2) NOT NULL,
    `Cantidad` INTEGER NOT NULL,
    `Estado` BOOLEAN NOT NULL,
    `publicar` BOOLEAN NOT NULL DEFAULT true,
    `CategoriaID` INTEGER NOT NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` VARCHAR(191) NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacturaDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Cantidad` INTEGER NOT NULL,
    `Subtotal` DECIMAL(10, 2) NOT NULL,
    `Estado` VARCHAR(191) NOT NULL,
    `FacturaID` INTEGER NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fecha` DATETIME(3) NOT NULL,
    `Total` DECIMAL(10, 2) NOT NULL,
    `Estado` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `DireccionID` INTEGER NOT NULL,
    `MetodoDePagoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ComentarioCliente` VARCHAR(191) NOT NULL,
    `CalificacionCliente` VARCHAR(191) NOT NULL,
    `ComentarioVendedor` VARCHAR(191) NOT NULL,
    `CalificacionVendedor` VARCHAR(191) NOT NULL,
    `UsuarioClienteID` INTEGER NOT NULL,
    `UsuarioVendedorID` INTEGER NOT NULL,
    `FacturaDetalleID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preguntas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Pregunta` VARCHAR(191) NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `ProductoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Respuesta` VARCHAR(191) NULL,
    `IDPregunta` INTEGER NULL,
    `UsuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolUsuario` ADD CONSTRAINT `RolUsuario_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolUsuario` ADD CONSTRAINT `RolUsuario_RolID_fkey` FOREIGN KEY (`RolID`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoDePago` ADD CONSTRAINT `MetodoDePago_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_CategoriaID_fkey` FOREIGN KEY (`CategoriaID`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagen` ADD CONSTRAINT `imagen_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacturaDetalle` ADD CONSTRAINT `FacturaDetalle_FacturaID_fkey` FOREIGN KEY (`FacturaID`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacturaDetalle` ADD CONSTRAINT `FacturaDetalle_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_DireccionID_fkey` FOREIGN KEY (`DireccionID`) REFERENCES `Direccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_MetodoDePagoID_fkey` FOREIGN KEY (`MetodoDePagoID`) REFERENCES `MetodoDePago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_UsuarioClienteID_fkey` FOREIGN KEY (`UsuarioClienteID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_UsuarioVendedorID_fkey` FOREIGN KEY (`UsuarioVendedorID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_FacturaDetalleID_fkey` FOREIGN KEY (`FacturaDetalleID`) REFERENCES `FacturaDetalle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_ProductoID_fkey` FOREIGN KEY (`ProductoID`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_IDPregunta_fkey` FOREIGN KEY (`IDPregunta`) REFERENCES `Preguntas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
