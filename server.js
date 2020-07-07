//note the .env file contains the environment variables.
//.gitignore should be setup to ignore the node_modules and also the .env file
//since we do not want those variables public (secret)
if (process.env.NODE_ENG !== 'production'){
    require('dotenv').config()
}
//Watch video again and comment out this whole thing.  

const express = require('express');  //set up express app.
const bcrypt = require('bcrypt');   
const app = express();  //call the express function.
const passport = require('passport');  //use the passport package
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');  //use the code in passport-config.js
const { use } = require('passport');
const users=[];
initializePassport(passport, 
    email=>users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    );  //this function is in passport-config.js
//To be able to use ejs here, (we want to change this to react later?)
app.set('view-engine', 'ejs')  //set our view engine to use ejs.
app.use(express.urlencoded({extended:false}));  //I wish to access infomation inside of the post methods for all the forms.
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.get('/', checkAuthenticated, (req, res)=>{  //homepage route, with a request vand a response variable.  So one could simply render index.ejs file like so:
    res.render("index.ejs",{name:req.user.name}); //send the object to index.ejs
})
//render login page on the route /login
app.get('/login', checkNotAuthenticated, (req, res)=>{
    res.render('login.ejs');  
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash:true
}))
//render register page on the route /register
app.get('/register', checkNotAuthenticated, (req, res)=>{
    res.render('register.ejs');
})

//Post to register page
app.post('/register', checkNotAuthenticated, async (req, res)=>{
    console.log(req.body.email);   //the name access exactly what we put in the input field matching the name attribute
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword);
        users.push({
            id: Date.now().toString(),
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login'); //if successful, redirect user back to the login page.
    } catch{
        res.redirect('/register');
    }
    console.log(users);
})

app.delete('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/login')  //bring user back to login page.
})

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/'); //if not authenticated, then back to homepage
    }
    next();
}

app.listen(3000);  //app listens on port 3000.