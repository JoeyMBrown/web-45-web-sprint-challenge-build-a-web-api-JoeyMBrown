// add middlewares here related to projects
const Projects = require('./projects-model');

function validateId(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
        .then((project) => {
            if(project) {
                req.body.project = project;
                next()
            } else {
                next({status: 404, message: 'No project found with given ID'})
            }
        })
        .catch(next)
}

function validateBody(req, res, next) {
    if(!req.body.name || !req.body.description) {
        next({ status: 400, message: 'Bad request, be sure to include a body and description when creating a project.'})
    } else {
        next()
    }
}


module.exports = { 
    validateId,
    validateBody,
 }