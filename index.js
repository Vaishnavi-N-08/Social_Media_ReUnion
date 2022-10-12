const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const PostRoute = require("./routes/post");



dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("MongoDB Connected");
});

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api",userRoute);
app.use("/api/authenticate",authRoute);
app.use("/api",PostRoute);


app.listen(process.env.PORT,()=>{
    console.log("backend server is running");
})