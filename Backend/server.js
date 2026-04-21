import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from "http";


const app = express();
const PORT = process.env.PORT || 5000;

// Databse connection 


// Middleware
app.use(cors());
app.use(express.json());


//Routes 
app.get('/', (req, res) => {
    res.send("API is running...");
})

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})