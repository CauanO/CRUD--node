const express = require ('express')
const app = express()
const { engine } = require ('express-handlebars');
const bodyParser = require ('body-parser')
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg") //ESSE LOCALS É PARA A CRIAÇÃO DE UMA VAR GLOBAL
    res.locals.error_msg = req.flash("error_msg")
    next()
})

app.use(express.static('./public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// BANCO DE DADOS
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/aplicacaoteste").then(function() {
    console.log("Conexão realizada com sucesso!!!")
}).catch((err) =>{
    console.log("Conexão mal sucedida!!")
})

// ROUTES
const adm = require('./routes/adm')
app.use('/adm', adm)

app.listen(8081,function(req, res) {
    console.log("Servidor OK")
})