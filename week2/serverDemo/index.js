const express = require ('express');

const app = express();

app.get('/', function(request, response){
    console.log('got a request');
    response.send('Hello, Welcome to ExpressJS');
})

app.listen(3000, function(){
    console.log('Listening on port 3000....')
})