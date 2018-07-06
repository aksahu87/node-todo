const {mongoose} = require('./../server/db/db');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/users');
const {ObjectId} = require('mongodb');

var id = "5b3e65dd113f4e802bcc6a4c";

if (!ObjectId.isValid(id)) {
    return console.log('Invalid id');
    
}
// Todo.find({
//     _id: "5b3e65dd113f4e802bcc6a4b"
// }).then((todos) => {
//     console.log(todos);
// });

// Todo.findOne({
//     _id: "5b3e65dd113f4e802bcc6a4b"
// }).then((todos) => {
//     console.log(todos);
// });

Todo.findById(id).then((todos) => {
    if (!todos) {
        return console.log('Id not found !');
    }
    console.log(todos);
}).catch((e) => console.log(e));