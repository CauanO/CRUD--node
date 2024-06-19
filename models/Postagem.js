//CHAMDA DO MOGOOSE
const mongoose = require("mongoose")
// CHAMADA DA VARIAVEL DO MOGOOSE
const Schema = mongoose.Schema;

const Postagem = new Schema ({
    titulo:{
        type: String,
        reqired: true
    }, 
    slug:{
        type: String,
        reqired: true
    }, 
    descricao:{
        type: String,
        reqired: true
    }, 
    conteudo:{
        type: String,
        reqired: true
    }, 
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "categorias",
        reqired: true
    }, 
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)