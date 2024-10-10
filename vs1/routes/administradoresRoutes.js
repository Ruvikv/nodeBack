import express from "express";
import AdministradoresController from "../../controllers/administradoresController.js";


const router = express.Router();
const administradoresController = new AdministradoresController();



router.get('/:idUsuario', administradoresController.consultarEmpleadoCreado); // Funciona ( id )

router.post('/',administradoresController.crearUsuarioEmpleado) // Funciona ( nombre , apellido, correoElectronico, contrasenia )




export { router };