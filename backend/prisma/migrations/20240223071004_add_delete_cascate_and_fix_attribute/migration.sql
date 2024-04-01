/*
  Warnings:

  - Made the column `status` on table `automatizacao` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `automatizacao` DROP FOREIGN KEY `automatizacao_rotina_id_fkey`;

-- DropForeignKey
ALTER TABLE `automatizacao` DROP FOREIGN KEY `automatizacao_unidade_dispositivo_id_fkey`;

-- DropForeignKey
ALTER TABLE `comodo` DROP FOREIGN KEY `comodo_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `rotina` DROP FOREIGN KEY `rotina_comodo_id_fkey`;

-- DropForeignKey
ALTER TABLE `unidade_dispositivo` DROP FOREIGN KEY `unidade_dispositivo_usuario_id_fkey`;

-- AlterTable
ALTER TABLE `automatizacao` MODIFY `status` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `unidade_dispositivo` ADD CONSTRAINT `unidade_dispositivo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comodo` ADD CONSTRAINT `comodo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotina` ADD CONSTRAINT `rotina_comodo_id_fkey` FOREIGN KEY (`comodo_id`) REFERENCES `comodo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `automatizacao` ADD CONSTRAINT `automatizacao_rotina_id_fkey` FOREIGN KEY (`rotina_id`) REFERENCES `rotina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `automatizacao` ADD CONSTRAINT `automatizacao_unidade_dispositivo_id_fkey` FOREIGN KEY (`unidade_dispositivo_id`) REFERENCES `unidade_dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
