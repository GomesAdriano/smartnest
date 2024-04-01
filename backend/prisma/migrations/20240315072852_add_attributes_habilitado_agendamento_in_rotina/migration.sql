-- AlterTable
ALTER TABLE `rotina` ADD COLUMN `agendamento` JSON NOT NULL,
    ADD COLUMN `habilitado` BOOLEAN NOT NULL DEFAULT false;
