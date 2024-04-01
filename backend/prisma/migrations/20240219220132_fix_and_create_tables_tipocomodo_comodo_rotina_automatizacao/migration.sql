/*
  Warnings:

  - You are about to drop the `categoria_dispositivos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dispositivos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unidade_dispositivos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dispositivos` DROP FOREIGN KEY `dispositivos_categoria_ dispositivo_id_fkey`;

-- DropForeignKey
ALTER TABLE `unidade_dispositivos` DROP FOREIGN KEY `unidade_dispositivos_dispositivo_id_fkey`;

-- DropForeignKey
ALTER TABLE `unidade_dispositivos` DROP FOREIGN KEY `unidade_dispositivos_usuario_id_fkey`;

-- DropTable
DROP TABLE `categoria_dispositivos`;

-- DropTable
DROP TABLE `dispositivos`;

-- DropTable
DROP TABLE `unidade_dispositivos`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `usuario` (
    `id` CHAR(40) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade_dispositivo` (
    `id` CHAR(40) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `usuario_id` CHAR(40) NOT NULL,
    `dispositivo_id` INTEGER NOT NULL,
    `comodo_id` CHAR(40) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dispositivo` VARCHAR(100) NOT NULL,
    `categoria_ dispositivo_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_dispositivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comodo` (
    `id` CHAR(40) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `tipo_comodo_id` INTEGER NOT NULL,
    `usuario_id` CHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_comodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rotina` (
    `id` CHAR(40) NOT NULL,
    `descricao` VARCHAR(100) NOT NULL,
    `comodo_id` CHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `automatizacao` (
    `id` CHAR(40) NOT NULL,
    `rotina_id` CHAR(40) NOT NULL,
    `unidade_dispositivo_id` CHAR(40) NOT NULL,
    `status` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `unidade_dispositivo` ADD CONSTRAINT `unidade_dispositivo_dispositivo_id_fkey` FOREIGN KEY (`dispositivo_id`) REFERENCES `dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_dispositivo` ADD CONSTRAINT `unidade_dispositivo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_dispositivo` ADD CONSTRAINT `unidade_dispositivo_comodo_id_fkey` FOREIGN KEY (`comodo_id`) REFERENCES `comodo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivo` ADD CONSTRAINT `dispositivo_categoria_ dispositivo_id_fkey` FOREIGN KEY (`categoria_ dispositivo_id`) REFERENCES `categoria_dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comodo` ADD CONSTRAINT `comodo_tipo_comodo_id_fkey` FOREIGN KEY (`tipo_comodo_id`) REFERENCES `tipo_comodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comodo` ADD CONSTRAINT `comodo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotina` ADD CONSTRAINT `rotina_comodo_id_fkey` FOREIGN KEY (`comodo_id`) REFERENCES `comodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `automatizacao` ADD CONSTRAINT `automatizacao_rotina_id_fkey` FOREIGN KEY (`rotina_id`) REFERENCES `rotina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `automatizacao` ADD CONSTRAINT `automatizacao_unidade_dispositivo_id_fkey` FOREIGN KEY (`unidade_dispositivo_id`) REFERENCES `unidade_dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
