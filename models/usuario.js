const {Schema,model} = require('mongoose');
var mongoose = require('mongoose');

const UsuarioSchema= Schema({
    name:{
        type:String,
        require:true
        

    },
    email:{
        type:String,
        require:true
        
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = model('usuario', UsuarioSchema);



