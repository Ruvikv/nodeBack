import Oficinas from '../database/oficinas.js';


export default class OficinasServices{
    constructor (){
        this.oficinas = new Oficinas();
    }

    //----------------------------------------------------------------
    buscarPorId = async (idOficina) => {
        return this.oficinas.buscarPorId(idOficina);
    };

    //----------------------------------------------------------------

    modificar = async (reclamoEstado) => {
        return this.oficinas.modificar(reclamoEstado);
    }

    //----------------------------------------------------------------




}