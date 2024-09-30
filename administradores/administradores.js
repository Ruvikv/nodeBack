import express from 'express';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


import { conexionDB } from './db/conexion.js';




dotenv.config()


const app = express();
app.use(express.json());




// Consulta rango Usuario
app.get('/usuarioTipo/:idUsuario', async (req, res) => {
    try{
        const idUsuario = req.params.idUsuario


        const sql = 'SELECT usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuariostipo.descripcion FROM usuarios INNER JOIN usuariostipo ON usuarios.idTipoUsuario = usuariostipo.idUsuarioTipo WHERE usuarios.idUsuario = ?;'
        const [result] = await conexionDB.query(sql, [idUsuario])

        if (idUsuario === null){
            return res.status(404).json({
                mensaje: "Se requiere el campo identificador"
            })
        }

        res.status(200).json(result)


    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
})




// Cambiar Rango
app.patch('/cambiarRango/idUsuario', async (req, res) => {
    try {

        const {idTipoUsuario} = req.body;

        if (!idTipoUsuario) {
            return res.status(400).json({message: 'Debe proporcionar un nuevo tipo de usuario'});
        }

        const idUsuario = req.params.idUsuario


        const sql = 'UPDATE usuarios SET idtipousuario = ? WHERE idusuario = ?;'
        const [result] = await conexionDB.query(sql, [idTipoUsuario, idUsuario])

        res.status(200).json(
            {mensaje: 'Se modifico el rango del usuario'}
        )

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno' });
    }
})





// Dar de Baja
app.patch('/baja/:idUsuario', async (req,res) =>{
    try {

        const activo = req.body.activo !== undefined ? req.body.activo: 0;

        const idUsuario = req.body.idUsuario

        if (idUsuario === null) {
            return res.status(404).json({message: 'Debe proporcionar un identificador de usuario'});
        }


        const sql = 'UPDATE usuarios SET activo = ? WHERE idusuario = ?;'
        const [result] = await conexionDB(sql,[activo,idUsuario])


        res.status(200).json(
            {mensaje: 'Se dio de baja al usuario'}
        )


    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno' });
    }
})
