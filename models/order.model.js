module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        idOrder:{
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
        user_fk: {
            type: Sequelize.INTEGER,
            references: {
                model: 'persons',
                key: 'id_user',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }




    });

    return Order;
};
