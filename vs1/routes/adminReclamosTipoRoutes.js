import express from "express";
import AdminReclamosTipoController from '../../controllers/adminReclamosTipoController.js';


const router = express.Router();
const adminReclamosTipoController = new AdminReclamosTipoController();


router.get('/', adminReclamosTipoController.obtenerTodos); // Funcionando

router.get('/:idReclamosTipo', adminReclamosTipoController.obtenerPorId); // Funcionando ( Id )

router.post('/', adminReclamosTipoController.crear); // Funcionando ( descripcion , activo )

router.patch('/:idReclamosTipo', adminReclamosTipoController.actualizar); //Funcionando ( id | descripcion, activo)

router.patch('/delete/:idReclamosTipo', adminReclamosTipoController.eliminarLogicamente); //



export { router }