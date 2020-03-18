//Crud
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to dabase')
    }
    console.log('Connected succesfully to the database')
    const db = client.db(databaseName)

   db.collection('tasks').insertMany([
    {
        description: "First task",
        completed: false
    },
    {
        description: "Second task",
        completed: true
    },
    {
        description: "Third task",
        completed: false
    }
   ], (error, result) =>{
       if(error){
          return console.log('Unable to insert items')
       }
       console.log(result.ops)
   })
})
