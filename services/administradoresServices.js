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

}