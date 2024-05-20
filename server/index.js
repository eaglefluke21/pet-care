import express from 'express';
import dotenv from 'dotenv';
// Importing route handlers
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

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