
  
module.exports = (sequelize, Sequelize) => {
    const Coments = sequelize.define("coments", {
        posted_by: {
            type: Sequelize.INTEGER
        },
        todo_id: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });
    return Coments;
};