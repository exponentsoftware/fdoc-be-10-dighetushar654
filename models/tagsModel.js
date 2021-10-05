module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        }
    });
    return Tags;
};

