const passport = require('passport');
const localstra = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userdata = require('../data/userdata'); 

passport.use(new localstra({usernameField: 'email'}, async (email, password, done)=>{
    const user = await userdata.findOne({email});
try {
    
    if (!user) {
        return done(null, false, {error: "user or pass incorrect"});
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
        return done(null, false, {error:"user or pass incorrect"})
    }

    done(null,user);
} catch (error) {
    done(error);
}
}))


passport.serializeUser((user,done)=>{
 done(null, user._id);
})

passport.deserializeUser(async (userid, done )=>{
    const user = await userdata.findOne({_id : userid});

    try {
        if (!user) {
            return  done({error: "user not found"});
        }
        done(null, user);
    
    } catch (error) {
        done(error);
    }

})

