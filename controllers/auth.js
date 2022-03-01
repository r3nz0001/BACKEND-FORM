const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const crearUsuario = async(req, res = response) => {
   const { email,password} =req.body;
   try{   
       let usuario = await Usuario.findOne({email})
       //console.log(usuario);
       if(usuario){
           return res.status(400).json({
               ok:false,
               msg:'un usuario existe con ese correo'
           })
       }
   usuario = new Usuario(req.body);

   //encriptar contraseña

   const salt = bcrypt.genSaltSync();
   usuario.password=bcrypt.hashSync(password, salt);
//
      await usuario.save();
        
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name
        })
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }
    
};

const loginUsuario = async (req, res = response) => {
      

    const {email,password}=req.body;
    try{
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            })
        }
// confirmar los password

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }
        // Generar JWT
        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name
            
        })



    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'por favor hable con el administrador'
        });
    }
  
};
const revalidarToken = (req, res = response) => {
    res.json({
        ok:true,
        msg:'renew'
    })
};

const obtenerRegistros = async ( req, res = response) =>{
    usuarios = await Usuario.find({}).exec();
    res.json({
        ok:true,
        usuarios:usuarios
    })
    
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    obtenerRegistros
}
