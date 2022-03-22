const express = require('express')
const bodyParser =  require('body-parser')
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.post('/dog', function (req, res){
    console.log(req.body)
    res.json(req.body)
    
})

app.listen(3000, function() {
    console.log('Server starting')
})




