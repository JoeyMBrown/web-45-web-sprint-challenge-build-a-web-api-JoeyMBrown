// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

function validateId(req, res, next) {
    Actions.get(req.params.id)
        .then((action) => {
            if(action) {
                req.body.action = action;
                next()
            } else {
                next({status: 404, message: "No action found at give ID"})
            }
        })
}

function validateBody(req, res, next) {
    
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        next({status: 400, message: 'Bad request, be sure to include a project_id, description, and notes'})
    } else if(req.body.description.length > 128) {
        next({status: 400, message: 'Bad request, description cannot be longer than 128 characters'})
    } else {
        next()
    }
}

function validateBodyId(req, res, next) {
    Projects.get(req.body.project_id)
        .then((project) => {
            if(project) {
                next()
            } else {
                next({status: 404, message: 'No project found at given id'})
            }
        })
}

module.exports = {
    validateId,
    validateBody,
    validateBodyId
}