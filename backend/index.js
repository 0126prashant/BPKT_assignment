const express = require("express");
const { connection } = require("./db");
const cors = require('cors');
const { studentRouter } = require("./routes/student.routes");
const app = express()
app.use(cors());
app.use(express.json());

app.use("/",studentRouter)

app.listen(process.env.port,async()=>{
 
    try {
        await connection;
        console.log(`Server is running at Port ${process.env.port} and also connected to DataBase`)
    } catch (error) {
        console.log(error.message)
    }
})