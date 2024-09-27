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

        const idReclamoTipo = req.params.idReclamoTipo

        const sql = 'SELECT * FROM reclamos INNER JOIN oficinas ON reclamos.idReclamoTipo = oficinas.idReclamoTipo WHERE idOficina = ?;'
        const [result] = await db.query(sql, [idReclamoTipo]);

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
app.patch('/oficina/idReclamoTipo', async (req, res) => {


    sql = 'SELECT * FROM reclamos INNER JOIN oficinas ON reclamos.idReclamoTipo = oficinas.idReclamoTipo INNER JOIN reclamosestado ON reclamos.idReclamoEstado = reclamosestado.idReclamoEstado WHERE oficinas.idOficina = 2;'
})