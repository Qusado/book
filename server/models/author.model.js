module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("autors", {
        id_autor:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fio: {
            type: Sequelize.STRING
        }




    });

    return Author;
};
