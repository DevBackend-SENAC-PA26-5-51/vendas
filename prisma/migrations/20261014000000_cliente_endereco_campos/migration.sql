-- AlterTable
ALTER TABLE `cliente`
  DROP COLUMN `endereco`,
  ADD COLUMN `rua` VARCHAR(100) NULL,
  ADD COLUMN `numero` INT NULL,
  ADD COLUMN `complemento` VARCHAR(100) NULL,
  ADD COLUMN `cidade` VARCHAR(45) NULL,
  ADD COLUMN `estado` VARCHAR(45) NULL;