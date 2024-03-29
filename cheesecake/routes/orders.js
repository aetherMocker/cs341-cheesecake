/**
 * orders.js
 * 
 * gets order data by querying db (gcloud) and posting it
 * 
 * Aether Mocker
 */

var express = require('express');
var router = express.Router();
var dbms = require('./dbms_promise');

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
    console.log("made it in query: " + res.req.body.MONTH);

    cheeseCakeData[0].quantity = 0;
    cheeseCakeData[1].quantity = 0;
    cheeseCakeData[2].quantity = 0;

    //if there's no problem with the sql query
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

      // send data...
      res.json({ error: null, data: cheeseCakeData });
    } else {
      // handle the error if there's an issue with the database query
      console.error("Database query failed:", err);
      res.json({ error: "Database query failed", data: null });
    }
  });
});

module.exports = router;