import { conexionDB } from "./conexion.js";



export default class ReclamosEstados{

    
    //----------------------------------------------------------------

    buscarTodos = async () => {
        const sql = 'SELECT * FROM `reclamosestado` WHERE activo = 1;'
        const [result] = await conexionDB.query(sql)
        return result
    }


    //----------------------------------------------------------------

    buscarPorId = async (idReclamoEstado)  => {
            const sql = 'SELECT * FROM reclamosestado WHERE activo = 1 AND idReclamoEstado = ?';
            const [result] = await conexionDB.query(sql, [idReclamoEstado])
            return (result.length > 0) ? result[0] : null;
    };





    //----------------------------------------------------------------
    
    crear = async ({descripcion,activo}) => {

        const sql = 'INSERT INTO reclamosestado (descripcion, activo) VALUES (?,?)';
        const [result] = await conexionDB.query(sql, [descripcion,activo])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear."    
            });
        }
        
        return this.buscarPorId(result.insertId);
    }

    
    //----------------------------------------------------------------

    /*modificar = async () => {

    } */
}