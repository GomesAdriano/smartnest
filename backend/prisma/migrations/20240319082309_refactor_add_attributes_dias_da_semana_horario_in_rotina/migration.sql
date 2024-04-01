/*
  Warnings:

  - You are about to drop the column `agendamento` on the `rotina` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rotina` DROP COLUMN `agendamento`,
    ADD COLUMN `dias_da_semana` JSON NOT NULL,
    ADD COLUMN `horario` VARCHAR(5) NULL;
