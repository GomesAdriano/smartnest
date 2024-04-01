-- CreateTable
CREATE TABLE `usuarios` (
    `id` CHAR(40) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade_dispositivos` (
    `id` CHAR(40) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `dispositivoId` INTEGER NOT NULL,
    `usuarioId` CHAR(40) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dispositivo` VARCHAR(100) NOT NULL,
    `categoriaDispositivoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_dispositivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `unidade_dispositivos` ADD CONSTRAINT `unidade_dispositivos_dispositivoId_fkey` FOREIGN KEY (`dispositivoId`) REFERENCES `dispositivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_dispositivos` ADD CONSTRAINT `unidade_dispositivos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_categoriaDispositivoId_fkey` FOREIGN KEY (`categoriaDispositivoId`) REFERENCES `categoria_dispositivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
