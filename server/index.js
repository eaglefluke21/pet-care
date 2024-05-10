import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

console.log(process.env.PORT);

const app = express();

console.log('server is running');

// Route to display a message when accessing the root url
app.get('/',(req,res) => {
    res.send("Hello from Cannine Companion");
});

// Starting the server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`You can access the server at http://localhost:${PORT}`);
});