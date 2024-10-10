import OficinasServices from "../services/oficinasServices.js";

export default class OficinasController {
    constructor() {

        this.service = new OficinasServices();
    }

    //----------------------------------------------------------------
    buscarPorId = async (req, res) => {
        try {
        const idOficina = req.params.idOficina;
        if (!idOficina) {
            return res.status(400).send({
                estado: 'Fallo',
                mensaje: "Se requiere el campo identificador"
            });
        }
            const oficinasId = await this.service.buscarPorId(idOficina);

            if (!oficinasId) {
                return res.status(404).send({
                    estado: 'No encontrado',
                    mensaje: `No se encontró un reclamo bajo ese id ${idOficina}`
                });
            }

            res.status(200).send({
                estado: 'Encontrado Correctamente',
                data: oficinasId,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                estado: 'Falla',
                message: "Error interno"});
        }
    }

    //----------------------------------------------------------------
    modificar = async (req, res) => {
        const {idReclamoEstado, idReclamo} = req.body;

        if (!idReclamoEstado) {
            return res.status(400).json({message: 'Debe proporcionar un estado de reclamo'});
        }
        if (!idReclamo){
            return res.status(400).json({message: 'Debe proporcionar un numero de reclamo'})
        }

        try {
            const reclamoEstado = {
                idReclamoEstado,
                idReclamo
            }

            const nuevoReclamoEstado = await this.service.modificar(reclamoEstado);
            res.status(200).send({
                estado: 'Modificado Correctamente',
                data: reclamoEstado,
            });

        }catch(err){
            console.log(err);
            res.status(500).send({
                estado: 'falla', mensaje: "error interno"
            });
        }
    }

    //----------------------------------------------------------------




}