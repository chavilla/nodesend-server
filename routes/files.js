const express=require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();
const auth=require('../middleware/auth');

router.post('/',auth,fileController.addFile);

router.delete('/:id',fileController.removeFile);


module.exports=router;