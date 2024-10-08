import AdministradoresServices from "../services/administradoresServices.js";



export default class AdministradoresController {
    constructor() {
        this.service = new AdministradoresServices();
    }

    //----------------------------------------------------------------

    consultarRango = async (req,res) => {
        try{
            const idUsuario = req.params.idUsuario
            if (!idUsuario){
                return res.status(404).send({
                    estado: 'Fallo',
                    mensaje: "Se requiere el campo identificador"
                })
            }

            const rangoId = await this.service.consultarRango(idUsuario)

            if (!rangoId){
                return res.status(404).send({
                    estado: 'No encontrado',
                    mensaje: `No se encontró un reclamo bajo el id: ${idUsuario}`
                })
            }
    
            res.status(200).send({
                estado: 'Encontrado Correctamente',
                data: rangoId,
            })
    
    
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Error interno' });
        }
    }

    //----------------------------------------------------------------

    cambiarRango = async (req,res) => {
        const {idUsuarioTipo, idUsuario} = req.body;

        if (!idUsuarioTipo) {
            return res.status(400).json({message: 'Debe proporcionar un nuevo tipo de usuario'});
        }
        if (!idUsuario){
            return res.status(400).json({message: 'Debe proporcionar un numero de usuario'})
        }
        try {
            const rangoUsuario = {
                idUsuarioTipo,
                idUsuario
            }

            const rangoActualizado = await this.service.cambiarRango(rangoUsuario);
            res.status(200).send({
                estado: 'Actualizado Correctamente',
                data: rangoActualizado,
            });

        }catch (error) {
            console.error(error);
            res.status(500).send({
                estado : 'Falla',
                message: 'Error interno'});
        }
    }
}