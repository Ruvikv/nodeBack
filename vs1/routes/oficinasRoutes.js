import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';

const router = express.Router();

const oficinasController = new OficinasController();


router.get('/:idOficina', oficinasController.buscarPorId);

router.patch('/', oficinasController.modificar)



export { router };