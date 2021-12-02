module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        id_cat:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title_cat: {
            type: Sequelize.STRING
        },

    });

    return Category;
};
