//check the header of the request to see if it contains an auth-token

require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = (req, res, next)=>{  //check the header of the request to see if it contains an auth-token
    const token = req.header('auth-token'); 
    if(!token){
        return res.status(401).json({msg:'No token, access denied,'});
    }
    try{  //If one exists, verify it with process.env.SECRET? (Why?)
        const decoded = jwt.verify(token, process.env.SECRET);  
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'Invalid token'});
    }
}

module.exports = auth;