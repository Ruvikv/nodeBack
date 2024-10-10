import Administradores from "../database/administradores.js";



export default class AdministradoresServices {

    constructor () {
        this.administradores = new Administradores();
    }

    //----------------------------------------------------------------

    consultarEmpleadoCreado = async (idUsuario) => {
        return this.administradores.consultarEmpleadoCreado(idUsuario);
    }

    //----------------------------------------------------------------

    crearUsuarioEmpleado = async (datos) => {
        return this.administradores.crearUsuarioEmpleado(datos);
    }

    //----------------------------------------------------------------

    obtenerTodos = () => {
        return this.administradores.obtenerTodosLosTipos();
    }

    //----------------------------------------------------------------

    obtenerPorId = (id) => {
        return this.administradores.obtenerTipoPorId(id);
    }

    //----------------------------------------------------------------

    crearTipo = (descripcion, activo) => {
        return this.administradores.crearNuevoTipo(descripcion, activo);
    }

    //----------------------------------------------------------------

    actualizarTipo = (id, descripcion, activo) => {
        return this.administradores.actualizarTipo(id, descripcion, activo);
    }

    //----------------------------------------------------------------

    eliminarTipo = (id) => {
        return this.administradores.eliminarTipo(id);
    }

}