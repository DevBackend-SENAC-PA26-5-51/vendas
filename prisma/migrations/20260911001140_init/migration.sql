-- CreateTable
CREATE TABLE `cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(15) NULL,
    `nome` VARCHAR(100) NULL,
    `contato` INTEGER NULL,
    `endereco` VARCHAR(150) NULL,
    `email` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(45) NULL,
    `numero` INTEGER NULL,
    `cidade` VARCHAR(45) NULL,
    `estado` VARCHAR(45) NULL,
    `bairro` VARCHAR(45) NULL,
    `cep` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NULL,
    `cpf` VARCHAR(15) NULL,
    `rg` VARCHAR(15) NULL,
    `data_nasc` DATE NULL,
    `estado_civil` VARCHAR(10) NULL,
    `contato` INTEGER NULL,
    `endereco_id` INTEGER NOT NULL,
    `cargo_id` INTEGER NOT NULL,
    `departamento_id` INTEGER NOT NULL,

    INDEX `fk_funcionarios_cargo1_idx`(`cargo_id`),
    INDEX `fk_funcionarios_departamento1_idx`(`departamento_id`),
    INDEX `fk_funcionarios_endereco1_idx`(`endereco_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemvenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` FLOAT NULL,
    `preco` FLOAT NULL,
    `vendas_id` INTEGER NOT NULL,
    `produtos_id` INTEGER NOT NULL,

    INDEX `fk_itemvenda_produtos1_idx`(`produtos_id`),
    INDEX `fk_itemvenda_vendas1_idx`(`vendas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metodo_pagamento` VARCHAR(15) NULL,
    `valo_pagamento` FLOAT NULL,
    `status_pagamento` VARCHAR(20) NULL,
    `data_pagamento` DATE NULL,
    `id_transação_operadora` INTEGER NULL,
    `mensagem_retorno` TINYTEXT NULL,
    `vendas_id` INTEGER NOT NULL,

    INDEX `fk_pagamentos_vendas1_idx`(`vendas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `quantidade` FLOAT NULL,
    `tipo` VARCHAR(45) NULL,
    `preco` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transportadoras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `contato` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_status` VARCHAR(20) NULL,
    `cliente_id` INTEGER NOT NULL,
    `transportadoras_id` INTEGER NOT NULL,
    `funcionarios_id` INTEGER NOT NULL,

    INDEX `fk_vendas_cliente_idx`(`cliente_id`),
    INDEX `fk_vendas_funcionarios1_idx`(`funcionarios_id`),
    INDEX `fk_vendas_transportadoras1_idx`(`transportadoras_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `fk_funcionarios_cargo1` FOREIGN KEY (`cargo_id`) REFERENCES `cargo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `fk_funcionarios_departamento1` FOREIGN KEY (`departamento_id`) REFERENCES `departamento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `fk_funcionarios_endereco1` FOREIGN KEY (`endereco_id`) REFERENCES `endereco`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itemvenda` ADD CONSTRAINT `fk_itemvenda_produtos1` FOREIGN KEY (`produtos_id`) REFERENCES `produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itemvenda` ADD CONSTRAINT `fk_itemvenda_vendas1` FOREIGN KEY (`vendas_id`) REFERENCES `vendas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagamentos` ADD CONSTRAINT `fk_pagamentos_vendas1` FOREIGN KEY (`vendas_id`) REFERENCES `vendas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `fk_vendas_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `fk_vendas_funcionarios1` FOREIGN KEY (`funcionarios_id`) REFERENCES `funcionarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `fk_vendas_transportadoras1` FOREIGN KEY (`transportadoras_id`) REFERENCES `transportadoras`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
