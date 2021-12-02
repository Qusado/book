module.exports = app => {
    const db = require("../models");
    const publishers = require("../controllers/publisher.controller.js");
    var router = require("express").Router();

    router.get("/:id_book", publishers.findOneByBook);
    router.get("/", publishers.getAll);


    app.use("/api/publishers", router);
};
