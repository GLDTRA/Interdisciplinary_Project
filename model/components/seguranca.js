// npm install sha1 -- Api
function ocultarSenha(senha) {
    var sha1 = require('sha1');
    console.log(senha);
    var hash = sha1(senha);
    console.log(hash);
    return(hash);
}

function autenticar(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/home/usuario');
    }
    next()
  }
module.exports = {ocultarSenha, autenticar, checkNotAuthenticated};