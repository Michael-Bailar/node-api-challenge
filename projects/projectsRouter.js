const express = require('express')

const Projects = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if (projects.length > 0) {
            res.status(200).json(projects)
        } else {
            res.status(404).json({ message: "projects not found" })
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error occured retrieving projects"})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
        Projects.get(id)
            .then(project => {
                if (project) {
                    res.status(200).json(project)
                } else {
                    res.status(404).json({ message: "project not found" })
                }
            })
            .catch(error => {
                res.status(500).json({message: "Error occured retrieving project"})
            })
})

router.post('/', (req, res) => {
    if (req.body.name && req.body.description) {
        Projects.insert(req.body)
        .then(project => {
            res.status(201).json({project})
        })
        .catch(error => {
            res.status(500).json({message: "an error ocurred creating your action"})
        }) 
    } else {
        res.status(400).json({message: "please input a project name and description"})
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
        Projects.update(id, changes)
        .then(projct => {
            if(!project) {
                res.status(404).json({ message: "project not found" })
            } else {
                res.status(202).json({message: "project successfuly updated", project: project})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error occured updating project"})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Projects.remove(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "project not found" })
            } else {
                res.status(202).json({ message: "1 project successfully deleted" })
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error occured updating project"})
        })
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    Projects.getProjectActions(id)
    .then(actions => {
        if (actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ message: "project not found" })
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error occured updating project"})
    })
})


module.exports = router