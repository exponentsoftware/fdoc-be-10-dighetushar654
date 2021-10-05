module.exports = (sequelize, Sequelize) => {
    const Premuim = sequelize.define("premiums", {
        user_id: {
            type: Sequelize.BIGINT
        },
        amount: {
            type: Sequelize.BIGINT
        },
        premiumType:{
            type: Sequelize.STRING
        }
    });
    return Premuim;
};

