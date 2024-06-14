import express from 'express';
import dotenv from 'dotenv';
// Importing route handlers
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
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // Enable credentials
  };
  app.use(cors(corsOptions));

// Express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req,res){
    
    res.send(" Home Page");
})

app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page');
  });


// User route handler
app.use('/users',userRoutes());


// passportjs route handle
app.use('/OauthRoutes',OauthRoutes)


app.listen(port , function(){
    console.log(`server is listening at http://localhost:${port}`);
});