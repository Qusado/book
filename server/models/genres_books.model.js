module.exports = (sequelize, Sequelize) => {
    const Book_Genre = sequelize.define("book_genres", {
        id_bg:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'books',
                key: 'id_book',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        genre_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'genres',
                key: 'id_genre',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }




    });

    return Book_Genre;
};
