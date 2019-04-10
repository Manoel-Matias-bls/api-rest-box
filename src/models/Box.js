const mongoose = require('mongoose');

const Box = new mongoose.Schema(
    {
    //torna a variável title sempre obrigatória e do tipo string
        title: {
            type: String,
            required: true,
        }, //Fazendo ligação via relacionamento com schema File
        files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}]
    }, 
    {
        timestamps: true //cria os created_at e update_at
    }
);

module.exports = mongoose.model('Box', Box);