import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { signupPassport } from './utils/SignuppassportGoogle.js';
import { loginPassport } from './utils/LoginpassportGoogle.js';
import OauthRoutes from './routes/OauthRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const port = process.env.PORT;

const reactUrl = process.env.REACT_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: `${reactUrl}`, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


app.use(loginPassport.initialize());
app.use(loginPassport.session());
app.use(signupPassport.initialize());
app.use(signupPassport.session());



app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page');
  });



app.use('/users',userRoutes());


app.use('/OauthRoutes',OauthRoutes)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port , function(){
    console.log(`server is listening at http://localhost:${port}`);
});