import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
// import cors from 'cors';

require("dotenv").config();

let app = express();
// app.use(cors({ origin: true }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


//client => call api (route) -> controller
//client => call api (route) -> middleware -> controller

// app headers
app.use(function(req,res,next){
    // website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',process.env.URL_REACT || 'http://localhost:3000');
    
    // request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type');

    
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})





viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;


app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: "+ port);
})