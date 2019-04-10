const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
    //torna a variável title sempre obrigatória e do tipo string
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true, //cria os created_at e update_at
        toObject: {virtuals: true},
        toJson: {virtuals: true}
    }
);

File.virtual('url').get(function(){
    return `http://localhost:3334/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);