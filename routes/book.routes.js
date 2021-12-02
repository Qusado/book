module.exports = app => {
    const db = require("../models");
    const books = require("../controllers/book.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth.mid.js')
    const Order = db.orders;
    const Fav = db.favs;
    const config = require('config')
    const {body} = require('express-validator');
    const {check} = require('express-validator');
    const Book = db.books;
    const {QueryTypes} = require("sequelize");
    const Book_genre = db.books_genres;
    const Book_authors = db.book_authors;
    const {validationResult} = require('express-validator');
    const uuid = require('uuid');
    const path = require('path');

    router.post("/", [
        check('title', 'Не заполнено название').isLength({ min: 1 }),
        check('author', 'Не заполнен автор').isLength({ min: 1 }),
        check('pub', 'Не заполнен издательство').isLength({ min: 1 }),
        check('gen', 'Не заполнен жанр').isLength({ min: 1 }),
        check('cat', 'Не заполнена категория').isLength({ min: 1 }),
        check('price', 'Не заполнена цена').isLength({ min: 1 }),
        check('demo', 'Не заполнена аннотация').isLength({ min: 1 })
    ], async (req, res) => {
        try{
            const id_user = req.headers['user_id'];

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Некорректно заполнена форма'

                })
            }
            const existing = await Book.findOne({where: {title : req.body.title}});

            if(!existing){
                const {images} = req.files;
                let fileName = uuid.v4() + ".jpg";
                images.mv(path.resolve(__dirname, '..', 'static', fileName));
                const book = {
                    title: req.body.title,
                    demo: req.body.demo,
                    text: req.body.text,
                    pub_fk: req.body.pub,
                    cat_fk: req.body.cat,
                    price: req.body.price,
                    images: fileName,
                    owners: id_user
                };

                console.log(book);

                Book.create(book)
                    .then(data => {
                        const new_id = data.id_book;
                        const book_author = {
                            book_fk: new_id,
                            author_fk: req.body.author
                        }
                        const book_genre = {
                            book_fk: new_id,
                            genre_fk: req.body.gen
                        }
                        Book_authors.create(book_author)
                        Book_genre.create(book_genre)

                        return res.status(201).json({ message: 'Добавлена книга' })
                    })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating."
                    });
                });
            } else
                return res.status(400).json({ message: 'Такая книга уже существует'})


        }catch (e){
            res.status(500).json({ message: 'Что-то пошло не так' })

        }
    });


    router.get("/", books.findAll);


    router.get("/cat/:cat_fk", books.findByCat);


    router.get("/:id_book", books.findOne);

    router.get("/profile/myBooks", auth , async (req, res) => {
        const id_user = req.user.userId;
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
    });

    router.get("/order/myBooks", auth, async (req, res) =>{
        const id_user = req.user.userId;
        console.log(id_user);
        const b = await db.sequelize.query(`SELECT * FROM books WHERE id_book IN(SELECT book_fk FROM orders WHERE user_fk = ${id_user})`,
            {
                replacements: { id_user: id_user },
                type: QueryTypes.SELECT
            }).then(results => {
                res.send(results);
        })
    });

    router.get("/favorites/myBooks", auth, async (req, res) =>{
        const id_user = req.user.userId;
        console.log(id_user);
        const b = await db.sequelize.query(`SELECT * FROM books WHERE id_book IN(SELECT book_fk FROM favorites WHERE user_fk = ${id_user})`,
            {
                replacements: { id_user: id_user },
                type: QueryTypes.SELECT
            }).then(results => {
            res.send(results);
        })
    });

    router.put("/update/:id_book", books.update);

    router.post("/toOrder/:id_book", auth, async (req, res)=>
    {
        const id_book = req.params.id_book;
        const id_user = req.user.userId;

        try{
            const order = {
                book_fk: id_book,
                user_fk: id_user
            }
            const toOrder = await Order.create(order).then(data => {

                Fav.destroy({where: {book_fk: id_book}});
                res.send(data);
            })


        }catch (e){
            res.status(500).json({message: "Что то пошло не так"})
        }

    });

    router.post("/toList/:id_book", auth, async (req, res)=>
    {
        const id_book = req.params.id_book;
        const id_user = req.user.userId;
        try{
            const list = {
                book_fk: id_book,
                user_fk: id_user
            }
            const toFavs = await Fav.create(list).then(data => {
                res.send(data);
            })

        }catch (e){
            res.status(500).json({message: "Что то пошло не так"})
        }

    });

    router.delete("/delete/:id_book", books.delete);
    router.get('/statistic/owners_statistic', books.AboutOwners);
    router.get('/owners', books.Owners);
    router.get('owner/:id_user', books.ByPerson);

    app.use("/api/books", router);

};
