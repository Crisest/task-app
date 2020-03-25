const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const jwt = require('jsonwebtoken')
const myfunction = async () => {
    const token = jwt.sign({_id: 'asda'}, 'thisismasdect', { expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismasdect')
    console.log(data)
}

myfunction()

//andrew -> adasdasddsa > andrew (encrypt)
//andrew -> adsadasddsa (hashing)
