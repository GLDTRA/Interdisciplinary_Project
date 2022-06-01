CREATE DATABASE sap_database;
USE sap_database;

CREATE TABLE `usuario` (
`id` int NOT NULL AUTO_INCREMENT,
`setor` VARCHAR (100) NULL DEFAULT NULL,
`cpf` VARCHAR(20) NOT NULL,
`nome` VARCHAR(100) NULL DEFAULT NULL,
`email` VARCHAR(100) NULL DEFAULT NULL,
`senha` VARCHAR(50) NULL DEFAULT NULL,
`perfil` VARCHAR (50) NULL DEFAULT NULL,
PRIMARY KEY(`id`));

drop table usuario;

INSERT INTO usuario (setor, cpf, nome, email, senha, perfil) 
VALUES ("RH", "49973085876","Teste ADM",'w@W','05b761259247b72e5acd8896651220f9f37c05e7', 'adm');

SELECT * FROM usuario;

UPDATE `sap_database`.`usuario` SET `senha` = '2e6f9b0d5885b6010f9167787445617f553a735f', `perfil` = 'adm' WHERE (`id` = '1');

