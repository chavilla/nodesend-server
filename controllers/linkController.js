const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const controller = {
  addLink: async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring a lo que llega
    const { originalName, name } = req.body;

    //Ceación de un objeto
    const link = new Link();
    link.url = shortid.generate();
    link.name = name;
    link.originalName = originalName;

    if (req.user) {
      const { download, password } = req.body;
      if (download) {
        link.download = download;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        link.password = await bcrypt.hash(password, salt);
      }
      link.author = req.user.id;
    }

    //Guardar en la base de datos
    try {
      await link.save();
      return res.json({ url: `${link.url}` });
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Hubo un error en el servidor", error });
    }
  },

  getLink: async (req, res) => {
    const { url } = req.params;

    const link = await Link.findOne({ url });

    //Si el enlace existe
    if (!link) {
      res.status(404).json({ msg: "Este link no existe." });
    }

    //Sio el enlace existe
    res.json({file: link.name}); 

  },

  //obtiene un listado de todos los enlaces
  getAll:async (req,res)=>{
    try {
      const links=await Link.find({}).select('url -_id');
      res.json({links});
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = controller;
