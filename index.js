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



app.post('/notificacion', (req, res) => {
    const correoDestino = req.body.correoElectronico;

    const filename = fileURLToPath(import.meta.url)

    
    const dir = path.dirname(`${filename}`) 
    


    const plantilla = fs.readFileSync(path.join(dir, '/utiles/plantilla.hbs'), 'utf8')


    const templete = handlebars.compile(plantilla)


    const datos = {
        nombre :'Sombrita Jr',
        reclamo: '555666'
    }
    
    const correoHtml = templete(datos)


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.CONTRASENA
        }
    })
    const mailOptions = {
        /* from: correoDestino, */
        to: process.env.CORREO,
        subject: 'Reclamo de Sombrita Jr',
        html: correoHtml,
    }
    //Envio
    transporter.sendMail(mailOptions, (error,info) => {
        if(error){
            console.log(error);
        } else {
            console.log('Correo enviado:'+ info.response);
            res.json({ mensaje: 'Correo enviado con éxito','estado:': true });
            res.send(true)
        }
    })
});



// GET
app.get('/reclamos-estado', async (req, res) => {
    try {
        const sql = 'SELECT * FROM `reclamosestado` WHERE activo = 1;'

        const [result] = await conexionDB.query(sql)

        res.status(200).json({estado: true,result})

    }catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error Interno'})
    }
});


// GET ID
app.get('/reclamos-estado/:idReclamoEstado', async (req, res) => {
    try {
        const idReclamoEstado = req.params.idReclamoEstado;

        const sql = 'SELECT * FROM reclamosestado WHERE activo = 1 AND idReclamoEstado = ?';

        const [result] = await conexionDB.query(sql, [idReclamoEstado])

        
        /* console.log(result) */
        if(result.length === 0){
            res.status(404).json({ mensaje: 'Reclamo no encontrado' })
            return;
        }
        

        res.status(200).json(result)

    }catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error Interno'})
    }
});

//PATCH
app.patch('/reclamos-estado/:idReclamoEstado', async (req, res) =>{
    try{
        const { descripcion, activo } = req.body;

        if (!descripcion) {
            return res.status(404).json({
                mensaje: "Se requiere el campo descripción"    
            })
        }
        
        /* if (!activo) {
            return res.status(404).json({
                mensaje: "Se requiere el campo activo"    
            })
        } */

        const idReclamoEstado = req.params.idReclamoEstado;

        const sql = 'UPDATE reclamosestado SET descripcion = ? , activo = ?  WHERE idReclamoEstado = ?';
        const [result] = await conexionDB.query(sql, [descripcion, activo, idReclamoEstado]);


        /* if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        } */
        
        res.status(200).json({
            mensaje: "Reclamo modificado"
        });

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
})



// POST
app.post('/reclamos-estado', async (req, res) => {
    try{

        const {descripcion, activo} = req.body

        if (descripcion === undefined) {
            return res.status(404).json({
                mensaje: "Se requiere el campo descripción"    
            })
        }
        
        if (activo === null) {
            return res.status(404).json({
                mensaje: "Se requiere el campo activo"    
            })
        }

        const sql = 'INSERT INTO reclamosestado (descripcion, activo) VALUES (?,?)';
        const [result] = await conexionDB.query(sql, [descripcion,activo])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }
        
        res.status(200).json({
            mensaje: "Reclamo Añadido"
        });

    }catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error Interno'})
    }}
)



// Delete
app.delete('/reclamos-estado/:idReclamoEstado', async (req, res) => {
    try{

        const idReclamoEstado = req.params.idReclamoEstado;

        if (idReclamoEstado === null){
            return res.status(404).json({
                mensaje: "Se requiere el campo identificador"
            })
        }

        
        const sql = 'DELETE FROM reclamosestado WHERE idReclamoEstado = ?;'
        const [result] = await conexionDB.query(sql, [idReclamoEstado])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo Eliminar."    
            })
        }

        res.status(200).json({
            mensaje: "Reclamo Eliminado"
        });
        

    }
    catch (err) {
        console.error(err)
        res.status(500).json({estado: false, mensaje: 'Error Interno'})
    }
})





const puerto = process.env.PUERTO
app.listen(puerto, () => {
    console.log(`escuchando en puerto ${puerto}`);
})

