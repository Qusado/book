const db = require("../models");
const Book = db.books;
const Book_genre = db.books_genres;
const {QueryTypes} = require('sequelize')
const Book_authors = db.book_authors;


exports.findAll = async (req, res) => {

    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
};


exports.myBooks = async (req, res) =>{
    // console.log("p", req.params)
    // console.log("q",req.query)
    // console.log("b",req.body)
    const id_user = req.params.id_user;
    Book.findAll({ where: { owners: id_user } })
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


exports.getOrder =  async (req, res) => {
};



exports.findOne = async (req, res) => {
    const id_book = req.params.id_book;
    console.log(id_book)

    await Book.findByPk(id_book).then(response => {
       res.send(response);
    }).catch(err => {
            res.status(500).send({
                message: "Error retrieving with id=" + {id_book}
            });
        });
};


exports.update = (req, res) => {
    const id_book = req.params.id_book;

    Book.update(req.body, {
        where: { id_book: id_book}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update with id=${id_book}. Maybe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating  with id=" + id_book
            });
        });
};


exports.delete = (req, res) => {
    const id_book = req.params.id_book;
console.log(id_book);
    Book_authors.destroy({where: {book_fk: id_book}})
    console.log("dscsd")
    Book_genre.destroy({where: {book_fk: id_book}})
    console.log("dscsd2")
    Book.destroy({
        where: { id_book: id_book }
    }).then(num => {
        console.log(num)
        if (num === 1) {
            res.send({
                message: "Was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete  with id=${id_book}. Maybe elem was not found!`
            });
        }
    }).catch(err => {
            res.status(500).send({
                message: "Could not delete with id=" + id_book
            });
        });
};



exports.findByCat = (req, res) => {
    const id_cat = req.params.cat_fk;
     Book.findAll({ where: { cat_fk: id_cat } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error."
            });
        });
};


exports.AboutOwners = async (req, res) => {

    await db.sequelize.query(`SELECT persons.name, COUNT(books.owners) AS books FROM books JOIN persons persons ON books.owners = persons.id_user GROUP BY persons.name`,
        {
                  bind: { status: 'active' },
                  type: QueryTypes.SELECT
              }).then(results => {
        res.send(results);
    })
};
exports.ByPerson = async (req, res) => {
    const id_user = req.id_user;
    console.log(id_user);
    Book.findAll({where: {owners: id_user}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error."
            });
        })
};
exports.Owners = async (req, res) => {
    await db.sequelize.query(`SELECT owners FROM books GROUP BY owners`,
        {
            bind: { status: 'active' },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
}

