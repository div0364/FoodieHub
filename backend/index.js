const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT||6010;

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


app.use(express.json());
app.use('/api/v1',require("./Routes/CreateUser"));
app.use('/api/v1',require("./Routes/DisplayData"));
app.use('/api/v1',require("./Routes/OrderData"));

app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});