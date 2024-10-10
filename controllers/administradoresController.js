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

    obtenerTodos = async (req, res) => {
        try {
            const tiposReclamos = await this.service.obtenerTodos();
            console.log(tiposReclamos); 
            res.status(200).json(tiposReclamos);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ mensaje: "Error interno." });
        }
    }

    //----------------------------------------------------------------

    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idReclamosTipo;
            const tipoReclamo = await this.service.obtenerPorId(id);

            if (tipoReclamo.length === 0) {
                return res.status(404).json({ mensaje: "Tipo de reclamo no encontrado." });
            }

            res.status(200).json(tipoReclamo);
        } catch (err) {
            res.status(500).json({ mensaje: "Error interno." });
        }
    }

    //----------------------------------------------------------------

    crear = async (req, res) => {
        try {
            const { descripcion, activo } = req.body;
            if (!descripcion || activo === undefined) {
                return res.status(400).json({ mensaje: "Faltan campos requeridos." });
            }

            await this.service.crearTipo(descripcion, activo);
            res.status(201).json({ mensaje: "Tipo de reclamo creado." });
        } catch (err) {
            res.status(500).json({ mensaje: "Error interno." });
            console.log(err)
        }
    }

    //----------------------------------------------------------------

    actualizar = async (req, res) => {
        try {
            const { descripcion, activo } = req.body;
            const id = req.params.idReclamosTipo;

            if (!descripcion || activo === undefined) {
                return res.status(400).json({ mensaje: "Faltan campos requeridos." });
            }

            await this.service.actualizarTipo(id, descripcion, activo);
            res.status(200).json({ mensaje: "Tipo de reclamo actualizado." });
        } catch (err) {
            res.status(500).json({ mensaje: "Error interno." });
        }
    }

    //----------------------------------------------------------------

    eliminarLogicamente = async (req, res) => {
        try {
            const id = req.params.idReclamosTipo;
            await this.service.eliminarTipo(id);
            res.status(200).json({ mensaje: "Tipo de reclamo eliminado lógicamente." });
        } catch (err) {
            res.status(500).json({ mensaje: "Error interno." });
        }
    }
}