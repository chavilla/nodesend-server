const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');

//Body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//routes
app.use('/api/users', require('./routes/users.js'));

//port and connection
const port=process.env.PORT || 4000;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise=global.Promise;
/* Usamos el método connect para conectar------- */
mongoose.connect('mongodb://localhost:27017/nodesend',{ useNewUrlParser:true, useUnifiedTopology: true })
.then(()=>{
    console.log('Conexión a la base de datos');
    /* Ejecutar la creación del servidor */
    app.listen(port,'0.0.0.0', ()=>{
        console.log('Servidor conectado al puerto '+port);
    })

})
.catch(error=> console.log(error));