// add middlewares here related to projects
const Projects = require('./projects-model')
function logger(req, res, next) {
  const timestamp = new Date ().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateProjectId (req, res, next) {
   try {
     const project = await Projects.get(req.params.id);
     if (!project) {
       res.status(404).json({ message: 'Project not found' });
     } else {
       res.json(project);
     }
   } catch (err) {
     res.status(500).json({
       message: 'Error retrieving project',
       stack: err.stack,
     });

}
}
module.exports = { validateProjectId, logger

}