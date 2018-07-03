var express = require('express');
//body parser takes an JSON and creates a JS object attaching to a 
//request object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/db');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');

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

app.listen(3000, () => {
    console.log('Started on port 3000');
});





// var user = new User({
//     email: 'aloksn4u@gail.com'
// });

// user.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//     console.log(err);
// })
