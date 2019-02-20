let jwt = require('jsonwebtoken');

let checkTokenNoError = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];// Express headers are auto converted to lowercase

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                req.decoded = null;
                next();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        req.decoded = null;
        next();
    }
};

module.exports = {
    checkTokenNoError: checkTokenNoError
}