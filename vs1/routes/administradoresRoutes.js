import express from "express";
import AdministradoresController from "../../controllers/administradoresController.js";


const router = express.Router();
const administradoresController = new AdministradoresController();



router.get('/:idUsuario', administradoresController.consultarEmpleadoCreado); // Funciona ( id )

router.post('/',administradoresController.crearUsuarioEmpleado) // Funciona ( nombre , apellido, correoElectronico, contrasenia )



router.get('/', administradoresController.obtenerTodos); 

router.get('/:idReclamosTipo', administradoresController.obtenerPorId);

router.post('/', administradoresController.crear);

router.patch('/:idReclamosTipo', administradoresController.actualizar);

router.patch('/delete/:idReclamosTipo', administradoresController.eliminarLogicamente);



export { router };