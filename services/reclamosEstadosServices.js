import ReclamosEstados from "../database/reclamosEstados.js";


export default class ReclamosEstadosServices {

    constructor (){
        this.reclamosEstados = new ReclamosEstados();
    }
    
    //----------------------------------------------------------------
    buscarTodos = async () => {
        return this.reclamosEstados.buscarTodos();
    }
    
    //----------------------------------------------------------------
    crear = async (reclamosEstado) => {
        return this.reclamosEstados.crear(reclamosEstado);
    }

}