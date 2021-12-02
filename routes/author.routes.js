module.exports = app => {
    const db = require("../models");
    const autors = require("../controllers/authors.controller.js");
    var router = require("express").Router();


    router.get("/:id_book", autors.findOneByBook);
    router.get("/", autors.getAll);


    app.use("/api/authors", router);
};
