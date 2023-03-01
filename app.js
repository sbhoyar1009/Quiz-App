const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const quizRouter = require("./routes/quiz.route")
const reportRouter = require("./routes/report.route")
const userRouter = require("./routes/user.route")
const sendErrorResponse = require('./helper/sendErrorResponse')
const app = express()

app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

 app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');


app.use("/quizzes",quizRouter)
app.use("/reports",reportRouter)
app.use("/users",userRouter)
app.get('*', (req, res) => {
    res.sendFile(path.resolve('Client', 'build', 'index.html'));
    });
app.use(sendErrorResponse)
module.exports = app;