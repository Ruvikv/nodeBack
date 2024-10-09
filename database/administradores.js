import { conexionDB } from "./conexion.js";

export default class Administradores{

    //----------------------------------------------------------------
    consultarRango = async (idUsuario) => {
        const sql = 'SELECT usuarios.idUsuario, usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuariostipo.descripcion FROM usuarios INNER JOIN usuariostipo ON usuarios.idUsuarioTipo = usuariostipo.idUsuarioTipo WHERE usuarios.idUsuario = ?;'
        const [result] = await conexionDB.query(sql, [idUsuario])
        return (result.length > 0) ? result[0] : null;
    }

    //----------------------------------------------------------------
    cambiarRango = async ({idUsuarioTipo, idUsuario}) => {
        const sql = 'UPDATE usuarios SET idusuariotipo = ? WHERE idusuario = ?;'
        const [result] = await conexionDB.query(sql, [idUsuarioTipo, idUsuario])
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }
        
        return this.consultarRango(idUsuario)
    }

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