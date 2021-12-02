const db = require("../models");
const Author = db.authors;
const {QueryTypes} = require('sequelize')

exports.findOneByBook = async (req, res) => {
    const id_book = req.params.id_book;


    await db.sequelize.query(`SELECT * FROM autors WHERE id_autor IN(SELECT author_fk FROM book_autors WHERE book_fk = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
            res.send(results);
        })
};

exports.getAll = async (req, res) =>{
    Author.findAll()
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



