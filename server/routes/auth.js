const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');  

const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
//Note that here, the user that the server sends back is associated with the token.  Look into auth.js in middleware.
router.get('/', auth, async (req, res)=>{
    try{  //if authenticated, get the user
        const user =await User.findById(req.user.id).select("-password"); //user gets picked everything except the password.
        res.json(user);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


//Post request to login
router.post('/',
[
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide 6 character long password').exists(),
],
 async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    //res.send('success!')
    const {email, password} = req.body;
    try{ //cases (if all validates): 1. email not found, 2. password do not match, otherwise give the browser a webtoken linked to the user.id.
        let user = await User.findOne({email});
        if(!user){  //user already exists
            return res.status(400).json({msg:'Invalid Credentials'});  
        }
        //compare password and if correct, then assign a web token
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return res.status(400).json({msg:'Invalid Credentials'});  
        }
        const payload = {  
            user : {
                id:user.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {  //assign this payload, which cintains the user id with the environment variable.
            expiresIn: 3600,
        }, (err, token)=>{
            if (err) throw err;
            res.send({token})  //This token is sent back to the browser?
        });  //what does this webtoken do?  So idea here is each use has a token associated with it.  And it expires in 36 seconds?
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;