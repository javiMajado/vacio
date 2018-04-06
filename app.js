var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

var app = express();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')}) 
                .then(()=>{
                    console.log('Conexion a la DB OK');
                })
                .catch((err)=>{
                    console.error('Error de conexion ' + err);
                })

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/proveedor', proveedor);

app.listen(3000,function(){
    console.log('Servidor OK - PORT:3000');
});