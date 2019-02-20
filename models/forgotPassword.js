let db = require('../database/db')
const Sequelize = require('sequelize');

const forgotPassword = db.sequelize.define('forgotPassword', {
    user_id : {
        type: Sequelize.INTEGER
    },
    crypto_string: {
        type: Sequelize.STRING
    }
});

module.exports = forgotPassword