const express = require("express");
const app = express();
const config = require("./config");

require("dotenv").config();
const port = config.PORT;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());

const mongoDB = require("./db");
mongoDB();

app.use('/api/v1',require("./Routes/CreateUser"));
app.use('/api/v1',require("./Routes/DisplayData"));
app.use('/api/v1',require("./Routes/OrderData"));

app.get('/', (req, res) => {
    res.send('FoodieHub API is running!');
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});