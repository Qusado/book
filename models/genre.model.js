module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genres", {
        id_genres:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title_genres: {
            type: Sequelize.STRING
        },

    });

    return Genre;
};
