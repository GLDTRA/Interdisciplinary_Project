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


INSERT INTO usuario (setor, cpf, nome, email, senha, perfil) 
VALUES ("RH", "49973085876","Teste ADM",'w@w','05b761259247b72e5acd8896651220f9f37c05e7', 'adm');

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

INSERT INTO `sap_database`.`professor` (`cpf`,`nome`, `sexo`, `data_nascimento`, `endereco`, 
`numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, 
`tel_residencial`, `celular`, `whatsapp`) 
VALUES ('49973085876','Vendrmel teste', 'masculino', '2001-09-09', 'av.nordestina', 
'5883', 'bloco 06', 'guaianases', 'são paulo', 'sp', '08431410', '112999999', 
'11995472026',1);

create table edital(
	id int primary key auto_increment,
    numero varchar(100),
    descricao text
);

INSERT INTO edital(numero, descricao) 
VALUES ('1010/32', "Teste de descrição de edital");

create table prof_coordenador(
	id int primary key auto_increment,
    nome varchar(150),
    cpf varchar(20)
); 

INSERT INTO prof_coordenador(nome, cpf) 
VALUES ('Antônio', "19868942893");

create table disciplina(
	id int primary key auto_increment,
    nome varchar(150),
    id_coordenador int,
    descricao text,
    foreign key(id_coordenador) references prof_coordenador(id)
);

INSERT INTO disciplina(nome, id_coordenador, descricao) 
VALUES ('Desenvolvimento Web',1, "Teste de descrição de disciplina");

create table concurso(
	cod int primary key auto_increment,
    unidade varchar(100),
    cidade varchar(100),
    id_edital int,
    id_disciplina int,
    foreign key(id_edital) references edital(id),
    foreign key(id_disciplina) references disciplina(id)
);

INSERT INTO concurso(unidade, cidade, id_edital, id_disciplina) 
VALUES ('Fatec Zona Leste','São Paulo',1, 1);






