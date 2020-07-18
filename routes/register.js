const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');  //returns a promise

const jwt = require('jsonwebtoken');


//Post request to register
router.post('/',
[
    check('name', 'Please provide a name.').not().isEmpty(),  //Check the proper validations.
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide 6 character long password').isLength({min:6})
],
 async (req, res)=>{
     console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){  //user already exists
            return res.status(400).json({msg:'user already exists'});  //return 400 error
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user : {
                id:user.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600,
        }, (err, token)=>{
            if (err) throw err;
            res.send({token})  //This token is sent back to the browser
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Another post (with Authentication), if user is registered, then can use credentials to log it.


module.exports = router;