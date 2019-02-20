let db = require('../database/db')
const Sequelize = require('sequelize');

const portfolioPurchase = db.sequelize.define('portfolioPurchase', {
    user_id : {
        type: Sequelize.INTEGER
    },
    coin : {
        type : Sequelize.STRING
    },
    price_per_coin : {
        type: Sequelize.DOUBLE
    },
    quantity : {
        type: Sequelize.DOUBLE
    },
    date_bought : {
        type: Sequelize.DATE
    },
    notes : {
        type: Sequelize.STRING
    }
});

module.exports = portfolioPurchase