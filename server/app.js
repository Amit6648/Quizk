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
const http = require('http');
const {Server} = require('socket.io');
const { Socket } = require('dgram');
require('dotenv').config();
require('./auth/pasport')
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from Vite frontend
  credentials: true // Allow cookies and authentication headers
}));

const server =  http.createServer(app);

const io = new Server(server, {
    cors: {
        origin : 'http://localhost:5173',
        credentials: true
    }
})

const rooms= {};



function getRandomQuestions(limit = 10) {
  return questions.aggregate([{ $sample: { size: limit } }]);
}

io.on('connection', (socket) => {
  console.log("user connected:", socket.id);

  socket.on('create-room', async (hostname) => {
    const roomId = Math.random().toString(36).substring(2, 8);
    rooms[roomId] = {
      host: socket.id,
      players: [{ id: socket.id, name: hostname, score: 0 }],
      currentQuestionIndex: 0,
      questions: [],
      answersReceived: {}
    };

    socket.join(roomId);
    socket.emit('room-created', roomId);
  });

  socket.on('join-room', async ({ name, roomId }) => {
    const room = rooms[roomId];
    if (!room || room.players.length >= 2) {
      socket.emit('room-error', 'Room not available');
      return;
    }

    room.players.push({ id: socket.id, name, score: 0 });
    socket.join(roomId);

    io.to(roomId).emit('room-joined', room.players.map(p => p.name));

    // Fetch questions and start quiz
    room.questions = await getRandomQuestions(10);
    sendQuestion(roomId);
  });

  socket.on('submit-answer', ({ roomId, answer }) => {
    const room = rooms[roomId];
    if (!room) return;

    const currentQ = room.questions[room.currentQuestionIndex];
    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    // Save answer
    room.answersReceived[socket.id] = answer;

    // If both players answered
    if (Object.keys(room.answersReceived).length === 2) {
      room.players.forEach(p => {
        if (room.answersReceived[p.id] === currentQ.correctAnswer) {
          p.score += 1;
        }
      });

      room.currentQuestionIndex++;
      room.answersReceived = {};

      if (room.currentQuestionIndex >= room.questions.length) {
        const winner = room.players.reduce((a, b) => a.score > b.score ? a : b);
        io.to(roomId).emit('quiz-finished', {
          players: room.players,
          winner: winner.name
        });
      } else {
        sendQuestion(roomId);
      }
    }
  });

  socket.on('disconnect', () => {
    for (let roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter(p => p.id !== socket.id);
      if (rooms[roomId].players.length === 0) delete rooms[roomId];
    }
  });

  function sendQuestion(roomId) {
    const room = rooms[roomId];
    const question = room.questions[room.currentQuestionIndex];
    const { text, options } = question;
    io.to(roomId).emit('new-question', {
      index: room.currentQuestionIndex + 1,
      total: room.questions.length,
      text,
      options
    });
  }
});



app.set("trust proxy", 1); // important if using reverse proxies (e.g., Vite dev server)

app.use(session({
    secret: "little one",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'lax', // use 'none' if using HTTPS
        secure: false    // true if HTTPS, false for localhost
    }
}));

app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(process.env.mongo).then(() => {
    console.log("working bro");
}).catch((err) => {
    console.log(err);
});



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
        res.json({id: req.user._id, name : req.user.name});
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



server.listen(3000, () => {
    console.log("working");
});