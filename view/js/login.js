function login(){
    var login = form_login.login.value;
    var senha = form_login.senha.value;
    
    if(login==""){
        alert("Digite seu login!");
        form_login.login.focus();
        return false;
    }
    if(senha==""){
        alert("Digite sua senha!");
        form_login.senha.focus();
        return false;
    }
}