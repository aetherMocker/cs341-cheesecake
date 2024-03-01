/**
 * orders.js
 * 
 * gets order data by querying db (gcloud) and posting it
 * 
 * Aether Mocker
 */

var express = require('express');
var router = express.Router();
var dbms = require('./dbms');

//data to send
var cheeseCakeData = [
  { topping: 'plain', quantity: 0 },
  { topping: 'cherry', quantity: 0 },
  { topping: 'chocolate', quantity: 0 },
];

/* GET home page. */
//res = response , get's sent to from script.js. req = request
router.post('/', function(req, res, next) {

  console.log("made it here: " + res.req.body.MONTH);
  
  dbms.query("select * from ORDERS where MONTH= '"+ res.req.body.MONTH +"'", function(err, results) {
    cheeseCakeData[0].quantity = 0;
    cheeseCakeData[1].quantity = 0;
    cheeseCakeData[2].quantity = 0;

    //if there's no error with the sql query
    if(!(err == null)) {

      for(var i = 0; i < results.length; i++) {
          console.log(results[i].TOPPING);

          if(results[i].TOPPING == 'plain') {
            cheeseCakeData[0].quantity += results[i].QUANTITY;
          }
          if(results[i].TOPPING == 'cherry') {
            cheeseCakeData[1].quantity += results[i].QUANTITY;
          }
          if(results[i].TOPPING == 'chocolate') {
            cheeseCakeData[2].quantity += results[i].QUANTITY;
          }
      }

      //send data...
      res.json({ error: null, data: cheeseCakeData});
    }
  })
  res.json( {error: null, data: cheeseCakeData });
});

module.exports = router;