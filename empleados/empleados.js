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



// Reclamos de una oficina
app.get('/oficina/idOficina', async (req, res) => {
    try{

        const idOficina = req.params.idReclamoTipo

        const sql = 'SELECT * FROM reclamos INNER JOIN oficinas ON reclamos.idReclamoTipo = oficinas.idReclamoTipo WHERE idOficina = ?;'
        const [result] = await db.query(sql, [idOficina]);

        if (result.lenght === 0){
            res.status(404).json({mensaje: 'Reclamo no encontrado'})
            return;
        }

        res.status(200).json(result)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error Interno'})
    }
})


//Modificar Reclamos estado oficina
app.patch('/oficina/idReclamo', async (req, res) => {
    try {

        const {idReclamoEstado} = req.body;

        if (!idReclamoEstado) {
            return res.status(400).json({message: 'Debe proporcionar un estado de reclamo'});
        }

        const idReclamo = req.params.idReclamo;

        const sql = 'UPDATE reclamos SET idreclamoestado = ?  WHERE idreclamo = ?;'
        const [result] = await conexionDB.query(sql,[idReclamoEstado,idReclamo])

        res.status(200).json({
            mensaje: 'Estado del reclamo modificado correctamente'
        })

    }
    catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error interno'})
    }    
})