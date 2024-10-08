import express from 'express';
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js';

const router = express.Router();


const reclamosEstadosController = new ReclamosEstadosController();


router.get('/', reclamosEstadosController.buscarTodos); //funciona

router.post('/', reclamosEstadosController.crear); // funciona


export { router };