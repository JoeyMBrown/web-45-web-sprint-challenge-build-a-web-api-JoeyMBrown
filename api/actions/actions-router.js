// Write your "actions" router here!
const express = require('express');

const router = express.Router();
const Actions = require('./actions-model');

const { validateId, validateBody, validateBodyId } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Actions.get()
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    res.status(200).json(req.body.action)
})

router.post('/', validateBodyId, validateBody, (req, res, next) => {
    Actions.insert(req.body)
        .then((newAction) => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateId, validateBody, (req, res, next) => {
    const updatedAction = {
        id: req.params.id,
        completed: req.body.completed || false,
        notes: req.body.notes,
        description: req.body.description,
        project_id: req.body.project_id
    }

    Actions.update(req.params.id, updatedAction)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then((success) => {
            if(success) {
                res.status(200).json()
            } else {
                next({status: 404, message: 'No action found at given id'})
            }
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