const multer=require('multer');
const shortid=require('shortid');
const fs=require('fs');
const Link=require('../models/Link');

const controller={

    //Añade un archivo
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
           }
       })
    },

    //Elimina un archivo
    removeFile:async (req,res,next)=>{
        try {
            //Elimina un archivo
            fs.unlinkSync(__dirname+`/../uploads/${req.file}`);
        } catch (error) {
            return res.status(500).json({msg:'No se encuentra el archivo.'})
        }
        
    },

    //Descarga un archivo
    download:async (req,res,next)=>{

        //Obtiene el enlace
        const link=await Link.findOne({ name: req.params.file });

        const file=__dirname + '/../uploads/'+ req.params.file;
        res.download(file);
          //Si las decargas son iguales a uno
        if (link.download===1) {
            //Eliminar el archivo 
            req.file=link.name;
            //Eliminar la entrada de la base de datos
            await Link.findOneAndRemove(req.params.url);

            next();
        }
        else{
            link.download--;
            await link.save();
        }
    }
}

module.exports=controller;