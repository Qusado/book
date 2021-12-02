const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        "ssl": {
            require: true,
            rejectUnauthorized: false
        }

    },
    // pool: {
    //     max: dbConfig.pool.max,
    //     min: dbConfig.pool.min,
    //     acquire: dbConfig.pool.acquire,
    //     idle: dbConfig.pool.idle
    // }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.persons = require("./person.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.bublishers = require("./publisher.model.js")(sequelize, Sequelize);
db.categorys = require("./category.model.js")(sequelize, Sequelize);
db.genres = require("./genre.model.js")(sequelize, Sequelize);
db.authors = require("./author.model.js")(sequelize, Sequelize);
db.books_genres = require("./genres_books.model.js")(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);
db.book_authors = require('./book_autor.model.js')(sequelize, Sequelize);
db.favs = require('./fav.model.js')(sequelize, Sequelize);
module.exports = db;
