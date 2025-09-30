// add middlewares here related to actions

function validateAction(req, res, next) {
  const {text} =req.body
  if (!text || !text.trim()) {
    res.status(400).json ({
      message:'missing required text field'
    })
  } else {
    req.text = text.trim()
    next()

  }
}

function validatePost(req, res, next) {
  const {name} =req.body
  if (!name || !name.trim()) {
    res.status(400).json ({
      message:'missing required name field'
    })
  } else {
    req.name = name.trim()
    next()

  }
}
module.exports= {
 validateAction,
 validatePost

}