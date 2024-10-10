import { conexionDB } from "./conexion.js";


export default class Oficinas{


    //----------------------------------------------------------------
    buscarPorId = async (idOficina) => {
        const sql = 'SELECT * FROM reclamos INNER JOIN oficinas ON reclamos.idReclamoTipo = oficinas.idReclamoTipo WHERE idOficina = ?;'
        const [result] = await conexionDB.query(sql, [idOficina])
        return (result.length > 0)  ? result[0] : null;
    };

    //----------------------------------------------------------------

    modificar = async ({ idReclamoEstado, idReclamo}) => {
        const sql = 'UPDATE reclamos SET idreclamoestado = ?  WHERE idreclamo = ?;'
        const [result] = await conexionDB.query(sql,[idReclamoEstado,idReclamo])
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }

        return this.buscarPorId(idReclamo)
    }

    //----------------------------------------------------------------


}