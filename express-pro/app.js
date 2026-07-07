require("dotenv").config();

const express=require("express");
const helmet=require("helmet");
const cors=require("cors");
const morgan=require("morgan");
//const authRoutes
const connectDB = require("./config/db");

const logger=require("./middleware/logger");
const errorHandler=require("./middleware/errorHandler");
const notFound=require("./middleware/notFound");

const studentRoutes=require("./routes/studentRoutes");
const userRoutes=require("./routes/userRoutes");

const app=express();

const PORT=process.env.PORT ||3000;


//BUILT-IN-MIDDLEWARE


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//THiRD PARTY MIDDLEWARE

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//CUSTOM MIDDLEWARE
app.use(logger);


// HOME ROUTE
app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to student management REST API",
        versiom: "1.0.0"
    });
});

//HELTH CHECK
app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK",
        uptime:process.uptime(),
        time:new Date()

    });
});

// API ROUTES
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/users", userRoutes);

//404 middleware
app.use(notFound);

//ERROR MIDDLEWARE
app.use(errorHandler);

// CONNECT DATABASE
connectDB();

//START SERVER
app.listen(PORT,()=>{
    console.log(`
        ============================
        Server Running Successfully
        http://localhost:${PORT}
        ============================
        `);
});