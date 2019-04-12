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
        toJSON: {virtuals: true}
    }
);

File.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3333'
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);