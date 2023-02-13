const mongoose = require('mongoose');
const Artigo = new mongoose.Schema({
    titulo:{
        type: String,
        require: true,
    },
    conteudo:{
        type: String,
        require: true
    }
    },{
        timestamps: true
});

mongoose.model('artigo', Artigo);
module.exports = Artigo
