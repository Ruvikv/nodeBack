import express from "express";
import AdministradoresController from "../../controllers/administradoresController.js";


const router = express.Router();
const administradoresController = new AdministradoresController();



router.get('/:idUsuario', administradoresController.consultarRango);

router.patch('/',administradoresController.cambiarRango)



export { router };