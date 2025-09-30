// Write your "actions" router here!
const express = require ('express')
const Actions = require ('./actions-model')

const router = express.Router()

router.get('/', async (req,res,) => {
  Actions.get()
  .then(found => {
    res.json(found)
  })
  .catch (err =>  {
    res.status(500).json ({
        message: 'Error retrieving actions',
        stack: err.stack,
    })
})
  })
  router.get('/:id', async (req, res) => {
    try {
      const action = await Actions.get(req.params.id);
      if (!action) {
        res.status(404).json({ message: 'Project not found' });
      } else {
        res.json(action);
      }
    } catch (err) {
      res.status(500).json({
        message: 'Error retrieving project',
        stack: err.stack,
      });
    }
  });
router.post('/', (req, res) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(err => {
      res.status(400).json({ message: 'Error creating project' ,
        stack:err.stack
      })
      
    })
})
router.put('/:id', (req, res, ) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(400).json(action);
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
  Actions.remove(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The actions could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: 'Error updating the actions' });
    });
});











module.exports = router 