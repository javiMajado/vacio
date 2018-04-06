var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor');

var app = express();

app.get('/', (req, res, next)=>{
    Proveedor.find({}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al recuperar proveedor',
                errores: err
            });
        }

        res.status(200).json({
            ok: true,
            proveedores: data
        })

    });
});

app.post('/', (req, res)=>{
    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

    proveedor.save((err, data)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear proveedor',
                errores: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor creado',
            proveedor: data
        })
    });
});

app.put('/:id', function(req, res, next){
    Proveedor.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar proveedor',
                errores: err
            });
        }

        console.log(req.params.id,req.body);
        res.status(200).json({
            ok: true,
            mensaje: 'Proveedor ' + data.nombre + ' actualizado',
        })
    });

});

app.delete('/:id', function(req, res, next){
    Proveedor.findByIdAndRemove(req.params.id, req.body, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar proveedor',
                errores: err
            });
        }

        console.log(req.params.id,req.body);
        res.status(200).json({
            ok: true,
            mensaje: 'Proveedor ' + data.nombre + ' eliminado',
        })
    });

});

module.exports = app;