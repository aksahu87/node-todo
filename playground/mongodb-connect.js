//const MongoClient = require('mongodb').MongoClient;
//Using destructing we got mongoclient and Object Id
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log("Unable to connect to mongo db.");
    };
    console.log("Connected to mongo db.");

    // var obj = new ObjectId();
    // console.log(obj);
    
    const db = client.db('TodoApp');

    db.collection('Todosnew').insertOne({
        text: 'Pay rent'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert into Todos', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    
    // db.collection('Users').insertOne({
    //     name: "Alok",
    //     age: 31,
    //     location:"Phoenix"
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Unable to insert into Users', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    client.close();

});