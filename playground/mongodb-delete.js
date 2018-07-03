//const MongoClient = require('mongodb').MongoClient;
//Using destructing we got mongoclient and Object Id
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log("Unable to connect to mongo db.");
    };
    
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({completed:true}).then((docs) => {
    //     console.log(docs);
    // }, (err) => {
    //     console.log('Unable to fetch the todos', err);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({_id: new ObjectId("5b3abca4cf23b16d774b9a77")}).then((docs) => {
    //     console.log(docs);
    // }, (err) => {
    //     console.log('Unable to fetch the todos', err);
    // });

    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({_id: new ObjectId("5b3abca4cf23b16d774b9a77")}).then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch the todos', err);
    });

    client.close();

});