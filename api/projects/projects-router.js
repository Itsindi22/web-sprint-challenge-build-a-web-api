// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
  Projects.get()
    .then(found => {
      res.json(found);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error retrieving projects',
        stack: err.stack,
      });
    });
});

// GET project by ID
router.get('/:id', async (req, res) => {
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
});
router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(err => {
      res.status(400).json({ message: 'Error creating project' ,
        stack:err.stack
      })
      
    })
})
router.put('/:id', (req, res, ) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(400).json(project);
      } else {
        res.status(400).json({ message: 'Request body is missing name, description' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: 'Error updating the project' });
    });
});
router.delete('/:id', (req, res, next) => {
  Projects.remove(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: 'Error updating the project' });
    });
});
router.get('/:id/actions', async (req,res,next) => {
  try {
    const result = await Projects.getProjectActions(req.params.id)
    res.json(result)
  } catch (err) {next(err)}
}
)




module.exports = router;
