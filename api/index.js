const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const salt = bcrypt.genSaltSync(12);

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_DB);

app.get('/test', (request, response) => {
    response.json('Test OK!')
});

app.post('/register', async (request, response) => {
    const {name, email, password} = request.body;
    try{
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        response.json(user);
    }catch(e){
        response.status(422).json(e);
    }
    
});

app.post('/login', async (request, response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email});
    if(user){
        const checkPassword = bcrypt.compareSync(password, user.password);
        if(checkPassword){
            jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {}, (error, token) => {
                if(error) throw error;
                response.cookie('token', token).status(200).json(user)
            });
        }
    }else{
        response.status(422).json('Password not correct!');
    }
});

app.get('/profile', (request, response) => {
    
});

app.listen(3000);