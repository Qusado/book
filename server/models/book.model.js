module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        id_book:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        demo: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        },
        pub_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'publishers',
                key: 'id_pub',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        cat_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'categories',
                key: 'id_cat',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        images: {
            type: Sequelize.STRING
        },
        owners:{
            type: Sequelize.INTEGER,
            references: {
                model: 'persons',
                key: 'id_user',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        price: {
            type: Sequelize.INTEGER
        }




    });

    return Book;
};
