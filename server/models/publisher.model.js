module.exports = (sequelize, Sequelize) => {
    const Publisher = sequelize.define("publishers", {
        id_pub:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title_pub: {
            type: Sequelize.STRING
        }
    });

    return Publisher;
};
