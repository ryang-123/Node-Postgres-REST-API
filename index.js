
 const express = require('express')
 const bodyParser = require('body-parser')
 //require("./database/connection");
 const app = express()
 const db = require('./queries')
 var path = require('path');
 const port = 3000

 var multer  = require('multer')
 var upload = multer()
 app.use(bodyParser.json())
 app.use(
   bodyParser.urlencoded({
     extended: true,
   })
 )

 app.get('/', (request, response) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    response.sendFile(path.join(__dirname + '/index.html'));
 })

 app.get('/users', db.getUsers)
 app.get('/users/:id', db.getUserById)
 app.post('/users', upload.none(), db.createUser)
 app.put('/users/:id', upload.none(), db.updateUser)
 app.delete('/users/:id', db.deleteUser)

 app.listen(port, () => {
   console.log(`App running on port ${port}.`)
 })

//DUE TO MULTI-PART FORM DATA, MULTI MUST BE ADDED (CHECK ABOVE FOR EXAMPLE)


//ADD PASSWORD FIELD FOR USER CREATION- CRYPT


// //TEST SERVING STATIC HTML OUT ABOVE TO TEST
// //var express = require('express');
// //var app = express();
// var path = require('path');
//
// // viewed at http://localhost:8080
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

//app.listen(8080);
