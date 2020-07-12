const express=require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { check }=require('express-validator');
const auth=require('../middleware/auth');

router.post('/',
[
    check('email','Introduce un email válido').isEmail(),
    check('password','La contraseña es un campo requerido').not().isEmpty()
],
authController.autenticar);
router.get('/',auth,authController.usuarioAutenticado);

module.exports=router;
