const express=require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { check }=require('express-validator');

//add an user
router.post('/',
[
    check('name','El nombre es un campo requerido').not().isEmpty(),
    check('email', 'El email introducido no es válido').isEmail(),
    check('password','El password debe ser mínimo de 8 caracteres').isLength({min:8})
],
userController.newUser);

module.exports=router;