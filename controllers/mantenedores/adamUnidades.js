import ADAM_unidades from "../../models/ADAM_unidades.js"

const editarCamion = async (req, res) => {
    
    const {id} = req.params;
    const {
        id_transportista, nom_patente, fec_rev_tecnica, fec_per_circulacion,
        fec_seguro, est_activo
    } = req.body;


    try {
        await ADAM_unidades.update({
            id_transportista, nom_patente, fec_rev_tecnica, fec_per_circulacion,
            fec_seguro, est_activo
        }, {
            where: {
                id: id
            }
        });

        res.status(200).json({msg: "Camión actualizado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al actualizar el camión"});
    }
}

export {
    editarCamion,
}
