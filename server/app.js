const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const subjects = require("./data/subjects");
const topics = require("./data/topics");
const questions = require('./data/questions');
require('dotenv').config();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.mongo).then(() => {
    console.log("working bro");
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send("kela");
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
    const {topicId} = req.params;
    const questiondata = await questions.find({topicId});
    res.json(questiondata);
})



app.listen(3000, () => {
    console.log("working");
});