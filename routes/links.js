const express=require('express');
const linkController = require('../controllers/linkController');
const fileController=require('../controllers/fileController');
const router = express.Router();
const { check }=require('express-validator');
const auth=require('../middleware/auth');

router.post('/',
[
    check('name','El nombre del archivo es requerido').not().isEmpty(),
    check('originalName','El nombre del archivo es requerido').not().isEmpty()
],
auth,
linkController.addLink);

router.get('/:url',
linkController.getLink, 
fileController.removeFile);

router.get('/', linkController.getAll);

module.exports=router;