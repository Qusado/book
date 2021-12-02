module.exports = app => {
    const db = require("../models");
    const genre = require("../controllers/genre.controller.js");
    var router = require("express").Router();


    router.get("/:id_book", genre.findOneByBook);
    router.get("/", genre.getAll);



    app.use("/api/genres", router);
};
