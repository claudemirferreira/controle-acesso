
// Including the file and initilize
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12!@',
    database: 'site'
});


// connect to database
mc.connect();

// Defualt response 

app.get('/', function (req, res) {

    return res.send({ error: true, message: "hello" });

});


// Retrieve all todos 
app.get('/todos', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});

// Retrieve todo with id 
app.get('/todo/:id', function (req, res) {

    let task_id = req.params.id;

    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }

    mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Todos list.' });
    });

});


// Add a new todo  
app.post('/todo', function (req, res) {

    let task = req.body.task;

    if (!task) {
        return res.status(400).send({ error: true, message: 'Please provide task' });
    }

    mc.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});


//  Update todo with id
app.put('/todo', function (req, res) {

    let task_id = req.body.task_id;
    let task = req.body.task;

    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }

    mc.query("UPDATE tasks SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});


//  Delete todo
app.delete('/todo/:id', function (req, res) {

    let task_id = req.params.id;

    mc.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });

});

app.get('/user/pendente', function (req, res) {
    mc.query('SELECT * FROM user ', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});

app.put('/user/autorizar', function (req, res) {
    console.log('user');
    let id = req.body.id;
    let autorizado = req.body.autorizado;
    //if (!task_id || !task) {
    //    return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    //}
    mc.query("UPDATE user SET autorizado = ? WHERE id = ?", [autorizado, id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

// Add a new todo  
app.post('/user', function (req, res) {

    let login = req.body.login;
    let senha = req.body.senha;
    let autorizado = req.body.autorizado;
    let perfil = req.body.perfil;

    //if (!task) {
    //    return res.status(400).send({ error: true, message: 'Please provide task' });
    //}

    let user = [null, login, senha, autorizado, perfil];

    let stmt = `INSERT INTO user VALUES(?,?,?,?,?)`;

    mc.query(stmt, user, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});


// All other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('Page not found');
    next();
});

//Port must be set to 8080 because incoming http request are routed from 80 to 8080

app.listen(8080, function () {

    console.log('Node app is running on port 8080');

});