function validar(){
    var nome = cadastro.nome.value;
    var sexo = cadastro.sexo.value;
    var data = cadastro.data.value;
    var endereco = cadastro.endereco.value;
    var numero = cadastro.numero.value;
    var estado = cadastro.estado.value;
    var cep = cadastro.cep.value;
    var celular = cadastro.celular.value;
    
    if(nome==""){
        alert("Nome é campo de preenchimento obrigatório!");
        cadastro.nome.focus();
        return false;
    }
    if(endereco==""){
        alert("Campo endereço é de preenchimento obrigatório!");
        cadastro.endereco.focus();
        return false;
    }
    if(sexo==""){
        alert("Campo sexo é de preenchimento obrigatório!");
        cadastro.sexo.focus();
        return false;
    }
    if(data==""){
        alert("Campo data de nascimento é de preenchimento obrigatório!");
        cadastro.data.focus();
        return false;
    }
    if(cidade==""){
        alert("Campo cidade é de preenchimento obrigatório!");
        cadastro.cidade.focus();
        return false;
    }
    if(estado==""){
        alert("Campo estado é de preenchimento obrigatório!");
        cadastro.estado.focus();
        return false;
    }
    if(numero==""){
        alert("Campo número é de preenchimento obrigatório!");
        cadastro.numero.focus();
        return false;
    }
    if(cep==""){
        alert("Campo CEP é de preenchimento obrigatório!");
        cadastro.cep.focus();
        return false;
    }
    if(celular==""){
        alert("Campo celular é de preenchimento obrigatório!");
        cadastro.celular.focus();
        return false;
    }
}