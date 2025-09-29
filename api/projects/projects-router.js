// Write your "projects" router here!
const express =require ('express');
const  projects = require ('./projects-model')

const router = express.Router()

router.get('/api/projects',(req,res) => {
    projects.find()
    .then(found => {
        res.json(found)
    })
    .catch (err => {
      res.status(500).json({
        message:"The points information could not be retrieved",
        err: err.message,
        stack: err.stack,
      })
        })
    })


module.exports = router










