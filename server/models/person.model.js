module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("persons", {
        id_user:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        }
    });

    return Person;
};
