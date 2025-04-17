const express = require('express');
const {response} = require("express");
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const SECRET = 'geheimesPasswort123';

function verifyToken(req, res, next) {
    const token = req.cookies.auth_token;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const user = {
    username: "erik",
    password: "1234"
}

let tasks = [
    {
        id: 1,
        Titel: "Task1",
        Beschreibung: "Dies das Ananas",
        Done: false,
        DueDate: new Date().toISOString()
    },
    {
        id: 2,
        Titel: "Task2",
        Beschreibung: "Dies das Ananas",
        Done: false,
        DueDate: new Date().toISOString()
    },
    {
        id: 3,
        Titel: "Task3",
        Beschreibung: "Dies das Ananas",
        Done: false,
        DueDate: new Date().toISOString()
    }
]

app.get('/tasks', verifyToken, (request, response) => {
    response.status(200).json(tasks);
})

app.post('/tasks', verifyToken, (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    newTask.Done = false;
    newTask.DueDate = new Date().toISOString();
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.get('/tasks/:id', verifyToken, (request, response) => {
    const task = tasks.find(t => t.id === parseInt(request.params.id))
    if (!task) return response.sendStatus(404)
    response.json(task)
});

app.patch('/tasks/:id', verifyToken, (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
    if (taskIndex < 0) return res.sendStatus(404)

    const updateParams = (({Titel, Beschreibung, DueDate}) => ({Titel, Beschreibung, DueDate}))(req.body)
    const updatedtask = {...tasks[taskIndex], ...updateParams}

    tasks.splice(taskIndex, 1, updatedtask)
    res.json(updatedtask)
});

app.delete('/tasks/:id', verifyToken, (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
    if (taskIndex < 0) return res.sendStatus(404);
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.post('/login', verifyToken, (req, res) => {
    const {username, password} = req.query;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({username}, SECRET, {expiresIn: '1h'});
        res.cookie('auth_token', token, {httpOnly: true});
        res.status(200).json({message: 'Login erfolgreich', token});
    } else {
        res.status(401).json({message: 'Ungültige Anmeldedaten'});
    }
});

app.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({message: 'Token ist gültig', user: req.user});
});

app.delete('/logout', verifyToken, (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({message: 'Logout erfolgreich'});
});




app.listen(app.listen(3000, () => {
        console.log(`Server läuft auf http://localhost:${port}`);
    })
)