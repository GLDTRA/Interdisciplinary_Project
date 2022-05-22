const express = require("express");
const app = express();

//npm install ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

var path = require('path');
app.set('views', path.join(__dirname, '/view/'));

// npm install body-parser
//utilitario que serve para receber dados de qualquer formulario dentro do express
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//npm i passport express-session
const passport = require('passport');
const session = require('express-session');
require('./model/components/autenticacao')(passport);
    //config
app.use(session({
    secret: '12345678', //configure um segredo seu aqui,
    resave: false, // salvar a cada requisição
    saveUninitialized: false, // sessões anônimas
    cookie: {maxAge: 30 * 60 * 1000} // 30min
}))

    app.use(passport.initialize());
    app.use(passport.session());

//Rota de validação de Login do usuário
app.post('/login/executar', passport.authenticate('local', {
    successRedirect: '/lista/usuario',
    failureRedirect: '/login/?fail=true'
}));

// npm install consign
var consign = require('consign');
consign().include('controller/routes', ).into(app);

app.use(express.static('view'));

app.listen(8081, function(){
    console.info("Servidor funcionando na url http://localhost:8081");
}) ; 
