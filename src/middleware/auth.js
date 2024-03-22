const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/userModel');

const jwt_secret = "mysecret";

const strategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret
    },
    async (jwtPayload, done) => {
        try {
            const user = await User.findById({userId: jwtPayload.id})
            if (!user) {
                const error = new Error("User not found")
                console.error(error)
                
            }  
            done(null, user)

        } catch (error) {
            done(error)
            
        }
    }
);


passport.use(strategy);

const initialize = () => {
    return passport.initialize();
};

const authenticate = () => {
    return passport.authenticate("jwt", {session: false})
}

module.exports = {
    initialize,
    authenticate
}