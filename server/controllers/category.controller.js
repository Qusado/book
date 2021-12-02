const db = require("../models");
const Category = db.categorys;
const {QueryTypes} = require('sequelize')


exports.findOneByBook = async (req, res) => {
    const id_book = req.params.id_book;
    await db.sequelize.query(`SELECT * FROM categories WHERE id_cat IN(SELECT cat_fk FROM books WHERE id_book = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
}

exports.getBooksByOne = async (req, res) => {
    const id_cat = req.params.id_cat;
    await db.sequelize.query(`SELECT * FROM books WHERE cat_fk = ${id_cat}`,
        {
            replacements: { id_cat: id_cat },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
}

exports.getAll = async (req, res) =>{
    Category.findAll()
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
