const multer=require('multer');
const shortid=require('shortid');
const fs=require('fs');

const controller={
    addFile: async (req,res)=>{
        //Configuración a multer para subir imágenes
        const configMulter={
            limits:{ fileSize: req.user ? 8000000:1000000},
            storage: fileStorage=multer.diskStorage({
                destination: (req,file,cb)=>{
                    cb(null,__dirname+'/../uploads');
                },
                filename:(req,file,cb)=>{
                    const extension=file.originalname.substring(file.originalname.lastIndexOf('.',file.originalname.length));
                    cb(null,`${shortid.generate()}${extension}`);
                }
            })
        }
        const upload=multer(configMulter).single('file');

        upload(req,res,async(error)=>{
           if (!error) {
               res.json({file:req.file.filename});
           }
           else{
               console.log(error);
               return next();
           }
       })
    },
    removeFile:async (req,res,next)=>{
        try {
            //Elimina un archivo
            fs.unlinkSync(__dirname+`/../uploads/${req.file}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=controller;