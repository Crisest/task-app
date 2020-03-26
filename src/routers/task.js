const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) =>{

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) =>{

    try {
        const tasks = await Task.find({owner: req.user.id})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) =>{

    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user.id})
      if(!task){
          return res.status(404).send()
      }
      res.send(task)  
    } catch (error) {
        res.status(500).send(error)
    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updatesAllowed = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => updatesAllowed.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user.id})
        
        if(!task){
            return res.status(404)
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router