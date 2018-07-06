const _ = require('lodash');
var express = require('express');
//body parser takes an JSON and creates a JS object attaching to a 
//request object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/db');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');
var {ObjectId} = require('mongodb');

var app = express();

//app.use middleware uses a function in case of custom middleware or 
//a library in case of imported one.
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    };

    Todo.findById(id).then((todo) => {
        res.status(200).send({todo});
    }).catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    };

    Todo.findByIdAndRemove(id).then((todos) => {
        if(!todos) {
            return res.status(400).send();
        }
        
        res.send(todos);
    }).catch((e) => res.status(400).send());

});

app.patch('/todos/:id', (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(id);
    
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    };

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=> {
        if (!todo) {
            res.status(400).send();
        }
        res.send(todo);
    }).catch((e) => res.status(400).send());

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    user.save().then((user) => {
        //res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};



// var user = new User({
//     email: 'aloksn4u@gail.com'
// });

// user.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//     console.log(err);
// })
