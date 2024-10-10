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

}