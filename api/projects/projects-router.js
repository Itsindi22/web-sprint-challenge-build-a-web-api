// Write your "projects" router here!
const express =require ('express');
const  Projects = require ('./projects-model')

const router = express.Router()

router.get('/',(req,res) => {
    Projects.get()
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










