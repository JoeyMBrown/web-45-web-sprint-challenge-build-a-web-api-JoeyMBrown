// Write your "projects" router here!
const express = require('express');

const router = express.Router();
const Projects = require('./projects-model');
const { validateId, validateBody } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    res.status(200).json(req.body.project)
})

router.post('/', validateBody, (req, res, next) => {
    Projects.insert(req.body)
        .then((newProject) => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateId, validateBody, (req, res, next) => {

    const changes = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed || false,
        id: req.params.id
    }
    Projects.update(req.params.id, changes)
        .then((updatedProject) => {
            res.status(200).json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(success => {
            if(success) {
                res.status(200).json()
            } else {
                res.status(404).json({message: 'No project found with provided id'})
            }
        })
        .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
      message: err.message
    })
  })

module.exports = router;