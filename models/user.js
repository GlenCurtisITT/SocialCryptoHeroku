let db = require('../database/db')
const Sequelize = require('sequelize');

const User = db.sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    },
    pass_hash: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    email_verification: {
        type: Sequelize.STRING
    }
});

module.exports = User




