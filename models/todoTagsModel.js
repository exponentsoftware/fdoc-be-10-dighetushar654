module.exports = (sequelize, Sequelize) => {
    const todo_Tags = sequelize.define("todo_tags", {
        todo_id:{
            type: Sequelize.INTEGER
        },
        tag_id:{
            type: Sequelize.INTEGER
        }  
    });
    return todo_Tags;
};