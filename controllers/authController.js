const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path:'variables.env' });
const {validationResult}=require('express-validator');

const authController = {
  autenticar: async (req, res) => {

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //Buscar el usuario en la db
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Este email no existe. Por favor regístrate." });
    }

    //Si el usuario existe comparamos el password
    if (bcrypt.compareSync(password, user.password)) {

      //Crear jwt
      const token=jwt.sign({
            id:user._id,
            name:user.name,
            email:user.email
        },
        process.env.SECRETA,
        {
          expiresIn: '4h',
        });

        res.json({token});

    } else {
      return res
        .status(401)
        .json({ msg: "El password introducido no coincide." });
    }
  },

  usuarioAutenticado: async (req, res) => {
      
       res.json({user:req.user})
        
  }
};

module.exports = authController;
