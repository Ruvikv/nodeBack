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



app.get('/reclamos', async (req, res) => {
    
})