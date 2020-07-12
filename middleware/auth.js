const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');

      if (authHeader) {
          //obtener el token
          const token=authHeader.split(' ')[1];

          try {
            //comprobar el jwt
            const user=jwt.verify(token,process.env.SECRETA);
            req.user=user;
            next();   
          } catch (error) {
            return res.json({msg: 'Token no válido'});     
          }
      }
}