import express from 'express';
import dotenv from 'dotenv';
// Importing route handlers
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

app.use(cookieParser());

app.options('*', cors());
const port = process.env.PORT;

console.log(port);

app.get('/', function(req,res){
    
    res.send(" working !!!!");
})


// Using Route handlers
app.use('/users',userRoutes());


app.listen(port , function(){
    console.log(`server is listening at http://localhost:${port}`);
});