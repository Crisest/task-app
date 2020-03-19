//Crud

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to dabase')
    }
    console.log('Connected succesfully to the database')
    const db = client.db(databaseName)

    db.collection('users').updateOne({
        _id: new ObjectID("5e716d6d2a57e056e0bc91b9")
    },{
        $inc: {
            age: 2
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({completed: false}, {
        $set: {
            completed: true
        }
    }).then((result) =>{
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)  
    })

    // db.collection('tasks').findOne({ _id: new ObjectID('5e7184a712998d4dac627612')}, (error, task) => {
    //     if(error){
    //         return console.log("Unable to fetch")
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) =>{
    //     if(error){
    //         return console.log("Unable to fetch information")
    //     }
    //     console.log(tasks)
    // })


    // db.collection('users').findOne({name: "Sally"}, (error, user) => {
    //     if(error){
    //         return console.log("unable to fetch")
    //     }
    //     console.log(user.age)
    // })

    // db.collection('users').find({age: 26}).toArray((error, users) =>{
    //     console.log(users)
    // })

    // db.collection('users').find({age: 26}).count((error, count) =>{
    //     console.log(count)
    // })
})
