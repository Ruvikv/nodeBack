import ReclamosEstadosService from "../services/reclamosEstados.js";


export default class ReclamosEstadosController{

    constructor(){
        this.service = new ReclamosEstadosService();
    }
    

    //----------------------------------------------------------------
    buscarTodos = async (req,res) => {
        try {
            const reclamosEstados = await this.service.buscarTodos();
            res.status(200).send({reclamosEstados});
        }catch(err){
            console.log(err);
            res.status(500).send({
                estado: 'falla', mensaje: "error interno"
            });
        }
    }

    
    //----------------------------------------------------------------
    crear = async (req, res) => {
        const {descripcion, activo} = req.body

        if (descripcion === undefined) {
            return res.status(404).send({
                estado: 'Fallo',
                mensaje: "Se requiere el campo descripción"    
            })
        }

        if (activo === null) {
            return res.status(404).send({
                mensaje: "Se requiere el campo activo",
                estado: 'fallo'
            })
        }

        try {
            const reclamoEstado = {
                descripcion,
                activo
            }

            const nuevoReclamoEstado = await this.service.crear(reclamoEstado)
            res.status(201).send({
                estado: 'Creado Correctamente',
                data: nuevoReclamoEstado,
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                estado: 'falla', mensaje: "error interno"
            });
        }
    }
    
    //----------------------------------------------------------------

}