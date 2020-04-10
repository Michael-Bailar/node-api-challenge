const express = require('express')

const Projects = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (req) {
        Projects.get(id)
            .then(project => {
                if (project) {
                    res.status(200).json(project)
                } else {
                    res.status(404).json({ message: "project not found" })
                }
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        console.log(req)
        res.status(404).json({ message: "project not found" })
    }
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json({project})
    })
    .catch(error => {
        console.log(error)
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Projects.update(id, changes)
    .then(project => {
        res.status(200).json({project})
    })
    .catch(error => {
        console.log(error)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Projects.remove(id)
        .then(project => {
            console.log(project)
            res.status(200).json({ message: "1 project successfully deleted" })
        })
        .catch(error => {
            console.log(error)
        })
})
router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    Projects.getProjectActions(id)
    .then(actions => {
        res.status(200).json({actions})
    })
    .catch(error => {
        console.log(error)
    })
})


module.exports = router