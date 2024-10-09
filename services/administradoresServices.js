import Administradores from "../database/administradores.js";



export default class AdministradoresServices {

    constructor () {
        this.administradores = new Administradores();
    }

    //----------------------------------------------------------------

    consultarRango = async (idUsuario) => {
        return this.administradores.consultarRango(idUsuario);
    }

    //----------------------------------------------------------------

    cambiarRango = async (usuarioRango) => {
        return this.administradores.cambiarRango(usuarioRango);
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