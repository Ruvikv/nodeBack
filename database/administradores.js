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
}