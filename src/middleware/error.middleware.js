const error = (err, req, res, next)=>{
    if(err.name === 'ValidationError'){
        res.status(400).send(err.message)
    } else {
        res.status(500).send(err.message)
    }
}

module.exports = error