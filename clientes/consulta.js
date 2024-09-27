import express from 'express';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


import { conexionDB } from '../db/conexion.js';




dotenv.config()


const app = express();
app.use(express.json());



// CONSULTA RECLAMO POR ID
app.get('/consulta-reclamo/idReclamo', async (req, res) => {
    try {
    const idReclamo = req.params.idReclamo;

    if (idReclamo === null) {
        return res.status(400).json({ 
            message: 'Debe proporcionar un id de reclamo' });
    }

    const sql = 'SELECT asunto, descripcion,fechaCreado,fechaFinalizado FROM reclamos INNER JOIN usuarios ON reclamos.idUsuarioCreador = usuarios.idUsuario WHERE idReclamo = ?'
    const [result] = await conexionDB.query( sql , [idReclamo] );

    res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
});



// CREAR USUARIO
app.post('/crearUsuario', async (req, res) => {
    try {
        const {nombre,apellido,correoelectronico,contrasenia} = req.body
        const idtipousuario = req.body.idtipousuario !== undefined ? req.body.idtipousuario : 1;
        const imagen = req.body.imagen || null;
        const activo = req.body.activo !== undefined ? req.body.activo: 1 ;

        if (!nombre ||!apellido ||!correoelectronico ||!contrasenia ||!idtipousuario ||!imagen ||!activo) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const sql = 'INSERT INTO usuarios (nombre, apellido, correoelectronico, contrasenia, idtipousuario, imagen, activo) VALUES (?,?,?,?,,?,?)'
        const [result] = await conexionDB.query(sql, [nombre, apellido, correoelectronico, contrasenia, idtipousuario, imagen, activo]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }
        
        res.status(200).json({
            mensaje: "Usuario creado correctamente"
        });
    
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
    });


// Actualizar Perfil
app.patch('/modificarUsuario/:idUsuario' , async (req, res) => {
    try {
        const {nombre,apellido,correoElectronico,contrasenia} = req.body;
        const imagen = req.body.imagen || null;

        if (!nombre &&!apellido &&!correoElectronico &&!contrasenia) {
            return res.status(400).json({ message: 'Ningún campo modificado' });
        }
        
        const idUsuario = req.params.idUsuario

        const sql = 'UPDATE usuarios SET nombre =?, apellido =?, correoelectronico =?, contrasenia =?, imagen =? WHERE idUsuario =?'
        const [result] = await conexionDB.query(sql, [nombre, apellido, correoElectronico, contrasenia, imagen, idUsuario]);

        res.status(200).json({
            mensaje: "Usuario modificado correctamente"
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
})




// CREAR RECLAMO
app.post('/crearReclamo', async (req, res) => {
    try {
        const {asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador} = req.body;
        const idusuarioFinalizador = req.body.idusuarioFinalizador || null;

        if (!asunto ||!descripcion ||!idReclamoEstado ||!idReclamoTipo ||!idUsuarioCreador) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const sql = 'INSERT INTO reclamos (asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idusuarioFinalizador) VALUES (?,?,?,?,?,?)'
        const [result] = await conexionDB.query(sql, [asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idusuarioFinalizador]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }
        
        res.status(200).json({
            mensaje: "Reclamo creado correctamente"
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
})



//Cancelar Reclamo creado
app.patch('/cancelar-reclamo/:idReclamo', async (req, res) => {
    try {
        const idReclamoEstado = req.body.idReclamoEstado ? req.body.idReclamoEstado : 4;

        if (!idReclamoEstado) {
            return res.status(400).json({ message: 'Debe proporcionar un estado de reclamo' });
        }

        const idReclamo = req.params.idReclamo

        const sql = 'UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?'
        const [result] = await conexionDB.query(sql, [idReclamoEstado, idReclamo]);

        res.status(200).json({
            mensaje: "Reclamo cancelado correctamente"
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
})