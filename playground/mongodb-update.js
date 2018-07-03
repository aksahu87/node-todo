//const MongoClient = require('mongodb').MongoClient;
//Using destructing we got mongoclient and Object Id
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log("Unable to connect to mongo db.");
    };
    
    const db = client.db('TodoApp');

    //findOneAndDelete
    db.collection('Todos').findOneAndUpdate(
        {_id: new ObjectId("5b3abcb31944ba6d79cd8e1c")},
        {
            $set: {
                completed: false
            }
        }, {
        returnOriginal: false     
        
    }).then((result) => {
        console.log(result);
        
    });

    client.close();

});