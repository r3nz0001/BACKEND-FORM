const { Router } = require('express');
const { check } = require('express-validator')
const{ crearUsuario, loginUsuario, revalidarToken, obtenerRegistros } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post(
    '/new',
    [//middlewares validacion con expressvalidator
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);
    

router.post('/', 
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos  
],
loginUsuario);
    

router.get('/renew',

revalidarToken);
   
router.get('/obtener',[],obtenerRegistros)

module.exports = router;