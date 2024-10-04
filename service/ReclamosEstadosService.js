import ReclamosEstados from "../db/ReclamosEstados.js";

export default class ReclamosEstadosService {

    constructor(){
        this.ReclamosEstados = new ReclamosEstados();
    }

    buscarTodos = () => {
        return this.ReclamosEstados.buscarTodos();
    }

    // buscarPorId = () => {
    // }
    
    crear = (reclamoEstado) => {
        return this.ReclamosEstados.crear(reclamoEstado);
    }

    // modificar = () => {
    // }
}