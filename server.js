const express = require('express')

const projectsRouter = require('./projects/projectsRouter')
const actionsRouter = require('./actions/actionsRouter')

const server = express()

server.use(logger)
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/api', (req, res) => {
    const message = process.env.MESSAGE || "Hello from localhost"
    res.status(200).json({ api: "up", message })
})

function logger (req, res, next) {
    const timestamp = new Date()
    console.log(`${req.method} Request to: ${req.originalUrl}, ${timestamp}`)
    next()
}

module.exports = server;