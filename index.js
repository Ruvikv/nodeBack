import express from 'express';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


import {router as v1OficinasRouter } from './vs1/routes/oficinasRoutes.js'
import { router as v1AdministradoresRouter } from './vs1/routes/administradoresRoutes.js';
import { router as v1ReclamosEstadoRouter } from './vs1/routes/reclamosEstadosRoutes.js';
import validateContentType from './middlewars/validateContentType.js';




dotenv.config()
const app = express();
app.use(validateContentType)
app.use(express.json());
app.use(validateContentType);




//Rutas
app.use('/v1/Oficinas', v1OficinasRouter)

app.use('/api/v1/administradores', v1AdministradoresRouter)

app.use('/api/v1/reclamosEstados', v1ReclamosEstadoRouter)









const puerto = process.env.PUERTO
app.listen(puerto, () => {
    console.log(`escuchando en puerto ${puerto}`);
})
