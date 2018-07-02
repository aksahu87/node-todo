//const MongoClient = require('mongodb').MongoClient;
//Using destructing we got mongoclient and Object Id
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log("Unable to connect to mongo db.");
    };
    
    const db = client.db('TodoApp');

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch the todos', err);
        
    // });

    db.collection('Users').find({name:'Alok'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch the todos', err);
        
    });

    client.close();

});