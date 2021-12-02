module.exports = (sequelize, Sequelize) => {
    const Book_author = sequelize.define("book_autors", {
        id_ba:{
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
        author_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'autors',
                key: 'id_autor',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }




    });

    return Book_author;
};
