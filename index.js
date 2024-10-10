import express from 'express';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


//Rutas importadas

// OFICINAS
import {router as v1OficinasRouter } from './vs1/routes/oficinasRoutes.js';

// ADMINISTRADORES
import { router as v1AdministradoresRouter } from './vs1/routes/administradoresRoutes.js';

// ADMIN RECLAMOS TIPO
import { router as v1AdminReclamosTipoRouter } from './vs1/routes/adminReclamosTipoRoutes.js';

// RECLAMOS ESTADOS
import { router as v1ReclamosEstadoRouter } from './vs1/routes/reclamosEstadosRoutes.js';

// MIDDLEWARS - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import validateContentType from './middlewars/validateContentType.js';




dotenv.config()
const app = express();
app.use(validateContentType)
app.use(express.json());



//--------------------------------------------------- // ROUTES // --------------------------------------------------------------------//

// OFICINAS
app.use('/v1/Oficinas', v1OficinasRouter)


//ADMINISTRADORES
app.use('/api/v1/administradores', v1AdministradoresRouter)
//ADMINISTRADORES RECLAMOS TIPO
app.use('/api/v1/adminReclamosTipo', v1AdminReclamosTipoRouter)


//RECLAMOS     ( LO QUE HIZO EL PROFE )
app.use('/api/v1/reclamosEstados', v1ReclamosEstadoRouter)







const puerto = process.env.PUERTO
app.listen(puerto, () => {
    console.log(`escuchando en puerto ${puerto}`);
})







/* app.post('/notificacion', (req, res) => {
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

        to: process.env.CORREO,
        subject: 'Reclamo de Sombrita Jr',
        html: correoHtml,
    }

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
 */

