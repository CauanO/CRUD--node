const router = require('express').Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens") //TEM QUE SE IGUAL O VALOR DA MODEL

router.get('/', function(req, res) {
    res.send("teste")
})

router.get('/categorias/add', function(req, res) {
    res.render('adm/addcategorias')
})

router.post('/categorias/nova', function(req, res) {
    var erros = []

    if (!req.body.nome) {
        erros.push({texto: "Nome inválido!!"})
    }

    if (!req.body.slug) {
        erros.push({texto: "Slug inválido!!"})
    }

    if (req.body.nome.length < 2) {
        erros.push({texto: "Nome pequeno!!"})
    }
    
    if (erros.length > 0) {
        res.render("adm/addcategorias", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Sucesso")
            res.redirect("/adm/categorias")
        }).catch((err) => {
            req.flash("error_msg", "ERROR")
            res.redirect("/adm")
        })
    }
})

router.get('/categorias', function(req, res) {
    Categoria.find().sort({date: 'desc'}).lean().then((categorias) =>{
        res.render("adm/categorias", {categorias: categorias})
    }).catch((err) =>{
        req.flash("error_msg", "ERRROR")
        res.redirect("/adm")
    })
})

router.get("/categorias/edit/:id", function(req, res) {
    Categoria.findOne({_id: req.params.id}).lean().then(function(categoria){
        res.render("adm/editcategorias", {categoria: categoria})
    }).catch((err) =>{
        req.flash("error_msg", "esta categoria não existe")
        res.redirect("adm/categorias")
    })
})

router.post("/categorias/edit", function(req, res) {
    Categoria.findOne({_id: req.body.id}).then((categoria) =>{
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() =>{
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/adm/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a edição!")
            res.redirect("/adm/categorias")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria!")
        res.redirect("/adm/categorias")
    })
})

router.post("/categorias/deletar", function(req, res) {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/adm/categorias") 
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria!")
        res.redirect("/adm/categorias")
    })
})

router.get("/postagens", function (req, res) {
    Postagem.find().populate("categoria").sort({ data: "desc" }).lean().then((postagens) => {
        res.render("adm/postagens", { postagens: postagens })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao mostrar as postagens!")
        res.redirect("/adm/postagens")
    })
})

router.get("/postagens/add", function(req, res) {
    Categoria.find().lean().then((categorias) => {
        res.render("adm/addpostagem", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o form!")
        res.redirect("/adm/categorias")
    })
})

// POSTAGEM NOVA
router.post("/postagens/nova", function (req, res) {
    var erros = []
    if (req.body.categoria == "0") {
        erros.push({ texto: "Categoria invalida, resgistre uma categoria" })
    }

    if (erros.length > 0) {
        res.render("adm/addpostagem", { erros: erros })
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/adm/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao criar a categoria!")
            res.redirect("/adm/postagens")
        })
    }
})

module.exports = router