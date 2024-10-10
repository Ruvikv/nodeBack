import { conexionDB } from "./conexion.js";

export default class Administradores{

    //----------------------------------------------------------------
    consultarEmpleadoCreado = async (idUsuario) => {
        const sql = 'SELECT usuarios.idUsuario, usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuariostipo.descripcion FROM usuarios INNER JOIN usuariostipo ON usuarios.idUsuarioTipo = usuariostipo.idUsuarioTipo WHERE usuarios.idUsuario = ?;'
        const [result] = await conexionDB.query(sql, [idUsuario])
        return (result.length > 0) ? result[0] : null;
    }

    //----------------------------------------------------------------
    crearUsuarioEmpleado = async (datos) => {
        const sql = 'INSERT INTO usuarios (nombre,apellido,correoElectronico,contrasenia,idUsuarioTipo,imagen,activo) VALUES (?, ? , ? , ? , ? , ?, ?);'
        const [result] = await conexionDB.query(sql, [datos.nombre, datos.apellido, datos.correoElectronico, datos.contrasenia, datos.idUsuarioTipo, datos.imagen, datos.activo]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear."    
            })
        }
        
        return this.consultarEmpleadoCreado(result.insertId)
    };

    //----------------------------------------------------------------

    obtenerTodosLosTipos = async () => {
        const sql = 'SELECT * FROM reclamostipo;';
        const [result] = await conexionDB.query(sql); 
        return result;
    }

    //----------------------------------------------------------------

    obtenerTipoPorId = async (id) => {
        const sql = 'SELECT * FROM reclamostipo WHERE idReclamoTipo = ?;';
        const [result] = await conexionDB.query(sql, [id]);
        return result;
    }

    //----------------------------------------------------------------

    crearNuevoTipo = async (descripcion, activo) => {
        const sql = 'INSERT INTO reclamostipo (descripcion, activo) VALUES (?, ?);';
        const [result] = await conexionDB.query(sql, [descripcion, activo]);
        return result;
    }

    //----------------------------------------------------------------

    actualizarTipo = async (id, descripcion, activo) => {
        const sql = 'UPDATE reclamostipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?;';
        const [result] = await conexionDB.query(sql, [descripcion, activo, id]);
        return result;
    }

    //----------------------------------------------------------------

    eliminarTipo = async (id) => {
        const sql = 'UPDATE reclamostipo SET activo = 0 WHERE idReclamoTipo = ?;';
        const [result] = await conexionDB.query(sql, [id]);
        return result;
    }
}