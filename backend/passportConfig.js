const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
//uses local strategy with a username, password and a done function being passed in.
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {  //find the username field being username.
        if (err) throw err;
        if (!user) return done(null, false);  //if does not exist, return null, false (no such user.)
        bcrypt.compare(password, user.password, (err, result) => {  //otherwise, compare the password of the user input and the password from user.password, 
          if (err) throw err;  //throw the error
          if (result === true) {  
            return done(null, user);  //done is a call back function that gives out the user.
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
