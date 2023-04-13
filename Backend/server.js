const express = require("express");
const chats = require('./Data/data');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoutes = require('./routes/messageRoute');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());


app.use("/api/user",userRoute);
app.use("/api/chat",chatRoute);
app.use('/api/message',messageRoutes);

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
const server =app.listen(port,()=>{
    console.log("The server is started at port 5000");
});

const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing",(room)=> socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=> socket.in(room).emit("stop typing"));

    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
      
            socket.in(user._id).emit("message recieved", newMessageRecieved);
          });
    });
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

})
