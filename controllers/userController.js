const User = require("../models/User");
const bcrypt = require("bcrypt");
const {validationResult}=require('express-validator');

const userController = {
  newUser: async (req, res) => {

    const errors=validationResult(req.body);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      const identity = await User.findOne({ email });

      if (identity) {
        return res.status(400).json({ msg: "Este Email ya está siendo usado" });
      }

      let usuario = new User(req.body);
      //hass de password
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
      await usuario.save();
      res.json({ msg: "Usuario creado correctamente" });

    } catch (error) {
      res.status(500).json({ msg: "Hubo un problema del servidor" + error });
    }
  },
};

module.exports = userController;
