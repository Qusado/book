const db = require("../models");
const {QueryTypes} = require('sequelize')
const Publisher = db.bublishers;

exports.findOneByBook = async (req, res) => {
    const id_book = req.params.id_book;
    await db.sequelize.query(`SELECT * FROM publishers WHERE id_pub IN(SELECT pub_fk FROM books WHERE id_book = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
};
exports.getAll = async (req, res) =>{
    Publisher.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error."
            });
        });
}
