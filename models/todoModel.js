
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        user_id: {
            type: Sequelize.BIGINT
        },
        username: {
            type: Sequelize.STRING
        },
        todoTitle: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        }
    });
  
    return Todo;
};