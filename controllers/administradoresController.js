import AdministradoresServices from "../services/administradoresServices.js";



export default class AdministradoresController {
    constructor() {
        this.service = new AdministradoresServices();
    }

    //----------------------------------------------------------------

    consultarEmpleadoCreado = async (req,res) => {
        try{
            const idUsuario = req.params.idUsuario
            if (!idUsuario){
                return res.status(404).send({
                    estado: 'Fallo',
                    mensaje: "Se requiere el campo identificador"
                })
            }

            const rangoId = await this.service.consultarEmpleadoCreado(idUsuario)

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

    crearUsuarioEmpleado = async (req,res) => {
        const {nombre, apellido, correoElectronico, contrasenia} = req.body || {};

        if (!nombre || !apellido || !correoElectronico || !contrasenia) {
            return res.status(400).json({message: 'debe completar los datos necesarios del nuevo empleado'});
        }
        try {
            const datos = {
                nombre,
                apellido,
                correoElectronico,
                contrasenia,
                idUsuarioTipo: 2,
                imagen: null,
                activo: 1,
            }

            const empleado = await this.service.crearUsuarioEmpleado(datos);
            res.status(200).send({
                estado: 'Empleado creado correctamente',
                data: empleado
            });

        }catch (error) {
            console.error(error);
            res.status(500).send({
                estado : 'Falla',
                message: 'Error interno'});
        }
    }

    //----------------------------------------------------------------
}