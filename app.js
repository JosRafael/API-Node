const express = require('express');
const app = express();
app.use(express.json());
require("./models/Artigo");
const mongoose = require('mongoose')
const cors = require('cors')
const Artigo = mongoose.model('artigo')

app.use((req, res, next)=>{
    console.log("Acessou o middleware!")
    app.use(cors())
    next()
})
//LISTAR ARTIGOS
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo)
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado."
        })
    })
});
//CADASTRANDO ARTIGOS
app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não cadastrado."
        })
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    })
});
//VISUALIZANDO ID
app.get("/artigo/:id", (req, res)=>{
    Artigo.findOne({_id:req.params.id}).then((artigo)=>{
        return res.json(artigo)
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message: "Nenhum artigo encontrado para esse id"
        })
    })
})
app.put("/artigo/:id", (req,res)=>{
    const artigo=Artigo.updateOne({_id:req.params.id}, req.body, (err)=>{
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possivel editar o artigo"
        })
        return res.json({
            error:false,
            message: "Artigo editado com sucesso! "
        })
    })
})
app.delete("/artigo/delete/:id", (req,res)=>{
    const artigo=Artigo.deleteOne({_id:req.params.id}, req.body, (err)=>{
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possivel excluir o artigo"
        })
        return res.json({
            error:false,
            message: "Artigo excluido com sucesso! "
        })
    })
})

mongoose.set("strictQuery", true)

mongoose.connect('mongodb://127.0.0.1:27017/projeto').then(() => {
    console.log("Conexão Estabelecida...")
}).catch(() => {
    console.log('Conexão Falha.')
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080...")
});