const express = require('express')

const Actions = require("../data/helpers/actionModel")
const projects = require('../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        if (actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ message: "actions not found" })
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error occured retrieving actions"})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "action not found" })
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error occured retrieving project"})
    })
})

router.post('/', (req, res) => {
    const projectId = req.body.project_id
    if (!projectId) {
        res.status(400).json({message: "please input an id for the project this action belongs to"})
    } else if (!req.body.description){
        res.status(400).json({message: "please add a description to your request"})
    } else if(req.body.description.length > 128 ) {
        res.status(400).json({message: "description needs to be less than 128 characters"})
    } else if (!req.body.notes) {
        res.status(400).json({message: "Please add notes to your request"})
    } else {
        Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({message: "The project for this action does not exist"})
        })
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Actions.update(id, changes)
    .then(action => {
        if (!action) {
            res.status(404).json({message: "action not found" })
        } else {
            res.status(200).json({message: "action successfully updated", action: action})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error occured updating action"})
    }) 
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Actions.remove(id)
    .then( action => {
        if (!action) {
            res.status(404).json({ message: "action not found" })
        } else {
            res.status(200).json({message: "1 action deleted"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error occured updating project"})
    })
})

module.exports = router