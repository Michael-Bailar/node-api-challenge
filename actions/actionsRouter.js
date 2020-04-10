const express = require('express')

const Actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/', (req, res) => {
    
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Actions.update(id, changes)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
    }) 
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Actions.remove(id)
    .then( action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router