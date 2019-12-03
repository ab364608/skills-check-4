require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const AC = require('./controllers/Authentication/authController');
const PC = require('./controllers/Posts/postsController');

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
        console.log("Database Connected")
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookies: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

app.use(express.json());

//Authentication
app.post('/auth/register', AC.register);
app.post('/auth/login', AC.login);
app.get('/auth/logout', AC.logout);

//Posts
app.get('/api/posts', PC.search);

app.listen(SERVER_PORT, () => {
    console.log(`Running on Port: ${SERVER_PORT}`)
})