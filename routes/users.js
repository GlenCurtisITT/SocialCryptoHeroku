let express = require('express');
let router = express.Router();
let models = require('../models/index');
let bcrypt = require('bcrypt');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let middleware = require('../auth/middleware');
let send = require('gmail-send')({
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
});
const saltRounds = 10;

router.get('/', middleware.checkTokenNoError, async(req, res) => {
    res.json({message: req.decoded})
});

router.post('/login', async(req, res) => {
    let userExists = await models.user.findOne({where : {email: req.body.email}});

    if(!userExists){
        res.json({error: 'Username or password incorrect'});
    }else{
        let passConfirm = bcrypt.compareSync(req.body.password, userExists.pass_hash)
        if(passConfirm){
            let token = jwt.sign(
                {email: req.body.email},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            );

            res.json({
                success: true,
                message: 'Authentication successful',
                token: token
            })
        }else{
            res.json({error: 'Username or password incorrect'});
        }
    }
});

router.get('/userFromToken', middleware.checkTokenNoError, async(req, res) => {
    if(!req.decoded){
        res.json({error: 'No token'})
    }else{
        let userExists = await models.user.findOne({where : {email: req.decoded.email}});
        delete userExists.dataValues.pass_hash;
        delete userExists.dataValues.email_verification;
        delete userExists.dataValues.id;
        res.json({user: userExists});
    }
});

router.post('/signup', async(req, res) => {
    if(req.body.email != null && req.body.password != null && req.body.passwordConf != null){
        let userExists = await models.user.findOne({where : {email: req.body.email}});
        if(userExists){
            res.json({
                error: 'Account with that email already exists. Please login or use forget password option.',
                email: req.body.email
            })
        }else if(req.body.password !== req.body.passwordConf){
            res.json({
                error: 'Password must be at least 8 characters, contain one capital and one number.',
                email: req.body.email
            })
        }else if(req.body.password.length < 8){
            res.json({
                error: 'Password must be at least 8 characters in length.',
                email: req.body.email
            });
        }else{
            let cryptoString = crypto.randomBytes(20).toString('hex');
            const saltValue = bcrypt.genSaltSync(saltRounds);
            const hashed = bcrypt.hashSync(req.body.password, saltValue);
            await models.user.create({
                email: req.body.email,
                pass_hash: hashed,
                active: 0,
                email_verification: cryptoString
            });
            await send({
                to: req.body.email,
                subject: 'Social Crypto - Email Verification',
                text: 'Click the following link to verify your email;\n' +
                `http://localhost:3000/users/verifyEmail/${req.body.email}/${cryptoString}`
            });

            res.json({
                success: 'User has been created. Please login.',
            });
        }
    }else{
        res.json({
            error: 'All fields must contain values',
            email: req.body.email
        });
    }

});

module.exports = router;
