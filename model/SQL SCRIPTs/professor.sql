use sap_database;

CREATE TABLE `professor` (
`registro` int NOT NULL AUTO_INCREMENT,
`cpf` VARCHAR(20) NOT NULL,
`nome` VARCHAR(255) NOT NULL,
`sexo` VARCHAR(50) NOT NULL,
`data_nascimento` DATE NOT NULL,
`endereco` VARCHAR(150) NOT NULL,
`numero` VARCHAR(20) NOT NULL,
`complemento` VARCHAR(50) NULL DEFAULT NULL,
`bairro` VARCHAR(50) NULL DEFAULT NULL,
`cidade` VARCHAR(50) NOT NULL,
`estado` CHAR(10) NOT NULL,
`cep` VARCHAR(30) NOT NULL,
`tel_residencial` VARCHAR(20) NULL DEFAULT NULL,
`celular` VARCHAR(20) NULL DEFAULT NULL,
`email` VARCHAR(50) NULL DEFAULT NULL,
`whatsapp` BOOLEAN NULL DEFAULT NULL,
PRIMARY KEY(`registro`));

drop table professor;

select * from edital;

INSERT INTO `sap_database`.`professor` (`cpf`,`nome`, `sexo`, `data_nascimento`, `endereco`, 
`numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, 
`tel_residencial`, `celular`, `whatsapp`) 
VALUES ('49973085876','Vendrmel teste', 'masculino', '2001-09-09', 'av.nordestina', 
'5883', 'bloco 06', 'guaianases', 'são paulo', 'sp', '08431410', '112999999', 
'11995472026',1);