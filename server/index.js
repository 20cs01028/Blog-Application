import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/', Router);



const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const user = process.env.user_name;
const pass = process.env.password;

Connection(user, pass);