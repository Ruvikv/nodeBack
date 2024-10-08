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

}