var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  // This will be replaced with a SELECT statement to SQL
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(504);
    } else {
      client.query('SELECT * FROM "todo" ORDER BY "complete";', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
}); //end router.get('/')

router.post('/newTask', function(req, res){
  var newTask = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('INSERT INTO todo (complete, task) VALUES ($1, $2);',
      [newTask.complete, newTask.task],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); //end router.post(/newTask)

router.put('/update/:id', function(req, res){
  var taskId = req.params.id;
  var taskBody = req.body;
  console.log('taskId', taskId);
  console.log('taskBody', taskBody);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else{
      client.query('UPDATE todo SET complete=$1 WHERE id=$2;', // This is the SQL query
      [taskBody.complete, taskId], // This is the array of things that replaces the $1, $2, $3 in the query
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
}); //closing '/update/:id' post

router.delete('/delete/:id', function(req, res){
  var taskId = req.params.id;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM todo WHERE id=$1;',
      [taskId],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
}); // closing delete request



module.exports = router;
