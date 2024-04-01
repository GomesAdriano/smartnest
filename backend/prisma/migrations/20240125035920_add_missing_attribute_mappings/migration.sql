/*
  Warnings:

  - You are about to drop the column `categoriaDispositivoId` on the `dispositivos` table. All the data in the column will be lost.
  - You are about to drop the column `dispositivoId` on the `unidade_dispositivos` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `unidade_dispositivos` table. All the data in the column will be lost.
  - Added the required column `categoria_ dispositivo_id` to the `dispositivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dispositivo_id` to the `unidade_dispositivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `unidade_dispositivos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dispositivos` DROP FOREIGN KEY `dispositivos_categoriaDispositivoId_fkey`;

-- DropForeignKey
ALTER TABLE `unidade_dispositivos` DROP FOREIGN KEY `unidade_dispositivos_dispositivoId_fkey`;

-- DropForeignKey
ALTER TABLE `unidade_dispositivos` DROP FOREIGN KEY `unidade_dispositivos_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `dispositivos` DROP COLUMN `categoriaDispositivoId`,
    ADD COLUMN `categoria_ dispositivo_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `unidade_dispositivos` DROP COLUMN `dispositivoId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `dispositivo_id` INTEGER NOT NULL,
    ADD COLUMN `usuario_id` CHAR(40) NOT NULL;

-- AddForeignKey
ALTER TABLE `unidade_dispositivos` ADD CONSTRAINT `unidade_dispositivos_dispositivo_id_fkey` FOREIGN KEY (`dispositivo_id`) REFERENCES `dispositivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_dispositivos` ADD CONSTRAINT `unidade_dispositivos_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_categoria_ dispositivo_id_fkey` FOREIGN KEY (`categoria_ dispositivo_id`) REFERENCES `categoria_dispositivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
