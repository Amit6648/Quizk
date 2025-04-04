const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const subjects = require("./data/subjects");
const topics = require("./data/topics");
const questions = require('./data/questions');
const users = require('./data/userdata');
const session =  require('express-session')
const bcrypt  = require('bcrypt');
const passport = require('passport');
require('dotenv').config();
require('./auth/pasport')
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from Vite frontend
  credentials: true // Allow cookies and authentication headers
}));

app.use(session({
    secret : "little one",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(process.env.mongo).then(() => {
    console.log("working bro");
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send("kela");
})

app.post('/registor',async (req,res)=>{
    const {name, email,password} = req.body;
    const hashedpass = await bcrypt.hash(password, 10);
try {
    const updated =  await users.create({
        name,
        email,
        password: hashedpass
    })

    res.status(201).json({email: updated.email,  name : updated.name})
} catch (error) {
    console.log(error)
}
   

})

app.post('/login', (req,res)=>{
    passport.authenticate('local', (error, user, info)=>{
        if (error) {
            return res.status(500).json({error : "there is a error"});

             }


             if (!user) {
               return res.status(401).json(info);
             }

            req.logIn(user,(error)=>{
                if (error) {
                    return res.status(500).json({error: "again somthing broke"})
                }
             return res.status(200).json({name:user.name, email: user.email})
                
            })
    })(req,res);
})

app.get('/me', (req,res)=>{
    if (req.isAuthenticated()) {
        res.json({id: req.user._id});
    }

    else{
        res.status(500).json({error:"there is something worng"})
    }
})

app.post('/logout', (req,res)=>{
  try {
    req.logOut();
    res.status(200).json('logout done')
    
  } catch (error) {
    res.status(500).json({error:"there is a error"});
  }
})

app.get('/subjects', async (req, res) => {

    const subdata = await subjects.find();

    res.json(subdata);

})

app.get('/subjects/:subjectId', async (req, res) => {
    const {subjectId} = req.params;
    const topicdata = await topics.find({subjectId});
    res.json(topicdata);
})

app.get('/subjects/topics/:topicId', async (req, res) => {

    

        try {
            const topicIds = req.params.topicId.split(',');
            const questiondata = await questions.find({topicId:{$in : topicIds}});
            res.json(questiondata);
        } catch (error) {
            console.log(error);
        }
  
   
   
})



app.listen(3000, () => {
    console.log("working");
});