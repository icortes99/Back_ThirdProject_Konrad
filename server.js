const app = require('./src/app')

let port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})