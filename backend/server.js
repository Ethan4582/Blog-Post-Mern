const connect = require("./connect"); 

const express = require("express");

const cors = require("cors");
//now this  post varible will allow us to acces the whole  routes 
const posts= require("./postRoutes")

// app is vairble that use the express method that help interact with sever
const app = express(); 
const PORT= 3000; 

// app.use mount your routes in order to work but we ned import it from postRoutes
app.use(cors())
app.use(express.json()) 

app.use(posts)// give access of the route we made int postRoutes 

app.listen(PORT, ()=>{
   connect.connectToServer()
   console.log(` the server is running ${PORT}`)
})