import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passportGoogle.js';
import OauthRoutes from './routes/OauthRoutes.js'

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());



app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page');
  });



app.use('/users',userRoutes());



app.use('/OauthRoutes',OauthRoutes)


app.listen(port , function(){
    console.log(`server is listening at http://localhost:${port}`);
});