create table concurso(
	cod int primary key auto_increment,
    unidade varchar(100),
    cidade varchar(100),
    id_edital int,
    id_disciplina int,
    foreign key(id_edital) references edital(id)
);

create table edital(
	id int primary key auto_increment,
    numero varchar(100),
    descricao text
);

create table disciplina(
	id int primary key auto_increment,
    id_coordenador int,
    descricao text,
    foreign key(id_coordenador) references prof_coordenador(id)
);

create table prof_coordenador(
	id int primary key auto_increment,
    nome int,
    cpf varchar(20)
);



