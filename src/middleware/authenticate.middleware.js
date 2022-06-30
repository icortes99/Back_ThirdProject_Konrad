const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    let userToken = req.headers['authorization'] || req.headers['x-access-token']

    //if(userToken.oauth_consumer_key === undefined){
    if(!userToken){
        res.status(401).send('Authentication token is a must')
        return
    }
    if(userToken.startsWith('Bearer ')){
        userToken = userToken.slice(7, userToken.length)
    }
    //console.log('userToken: ' + userToken)
    jwt.verify(userToken, 'admin123', (error, decoded)=>{
        if(error){
            res.status(401).send('Token not valid')
        } else {
            //console.log('user token: ' + userToken)
            req.decoded = decoded
            next()
        }
    })
}

module.exports = authentication