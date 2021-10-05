const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            set(value){
                this.setDataValue('email', value + '@gmail.com')
            },
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.BIGINT
        },
        userRole: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        accountType:{
            type: Sequelize.STRING
        }
     
    });
  
    return User;
}