const dotenv = require("dotenv").config();
const express =require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

/// inntialize express frame work
const app = express();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://inventory-ims.netlify.app"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Route Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute)

//Routes
app.get("/",(req,res)=>{
  res.send("Home Page")
});

// connecting to server
const PORT = process.env.PORT || 5000;
// Error Handler
app.use(errorHandler);
//connect to Database MONGO and start server

mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>{
    app.listen(PORT,() => {
      console.log(`Server Running on port: ${PORT}`)
    })
  })
  .catch((err)=> console.log(err))

