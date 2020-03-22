require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5e73ef09ab58f94b842ba7db').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const FindTaskandRemoveandCount = async (id, completed) => {
    const taskRemoved = await Task.findByIdAndRemove(id)
    const NumberofTask = await Task.countDocuments({completed})
    return NumberofTask
}

FindTaskandRemoveandCount('5e75583bc4a74f5c0ccf7768', true).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

