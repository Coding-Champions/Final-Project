const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';
// /users/register
users.post('/register', (req, res)=>{
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password,
    }
    User.findOne({
        email: req.body.email
    }).then(user=>{
        if (!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password = hash;
                User.create(userData)
                .then(user=>{
                    res.json({status: user.email + 'registered!'})
                })
                .catch(err=>{
                    res.send('error' + err)
                })

            })
        }else { //when user is found.
            res.json({error: "User already exists"})
        }
    })
    .catch(err=>{
        res.send('error: ' + err);
    })
});
// /users/login
users.post('/login', (req, res)=>{
    User.findOne({
        email: req.body.email
    })
    .then(user=>{
        if (user){  //if email matches something in the database.
            if (bcrypt.compareSync(req.body.password, user.password)){
                const payload = {  //make a payload object.
                    _id:user._id,
                    name: user.name,
                    email:user.email,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })//create a token with the payload info
                res.send(token);  //send it to the browser.
            }else {
                res.json({error: "Password is not valid."})
            }
        }else {
            res.json({error: "User does not exist"});
        }
    }).catch(err =>{
        res.send('error' + err);
    })
});

/* users.get('/profile', (req, res)=>{
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    //SUCCESS!!!!  So if token was provided then we can log it!
    console.log(decoded);
    User.findOne({
        _id: decoded._id
    })
    .then(user=>{
        if(user){
            res.json(user);
        }else {
            res.send("user does not exist.")
        }
    })
    .catch(err =>{
        res.send('error' + err);
    })
}); */

users.post('/addmovie', (req, res)=>{
    User.update({"email": req.body.email}, {$push:{"showList": req.body.movieData}}).then(response=>{
        console.log("Movie is added");  //This shows the modified information from the database.
        res.json("Movie has been added");
    })
    .catch(err => {
        res.json("server error");
    })
});
//does not work if it is a get request?!?!?
users.post('/getmovies', (req, res)=>{
    console.log("hitting the getmovies route")
    console.log(req.body)
    console.log(req.body.email);
    User.findOne({
        email: req.body.email
    }).then(user=>{
        res.json(user);
    });
})
users.get('/getfriends', (req, res)=>{
    console.log('hitting the getfriends route');
    const dbusers = [];
    User.find({}).then(users=>{
        users.forEach((element)=>{
            var userObj = {
                "id": element._id,
                "name": element.name,
            }
            dbusers.push(userObj);
        });
        //console.log(dbusers);
        res.send(dbusers);
    }).catch(err=>res.send("Server Error"));
})
//OK why doesnt a get request work?!?!?!
users.post('/getonefriend', (req, res)=>{
    User.find({
        _id: req.body.id,
    }).then(user=>{
        console.log(user);
        //console.log(user[0].showList);
        //console.log(user[0].name);
        
        var data = {
            showList: user[0].showList,
            name: user[0].name
        }
        console.log(data);
        res.json(data);
    }).catch(err=>
        res.send('server side error'))
})


module.exports = users;