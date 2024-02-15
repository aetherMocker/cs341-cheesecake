//https://expressjs.com/en/guide/routing.html

var express = require('express');
var router = express.Router();

//sample data
var cheeseCakeData = [
  { topping: 'plain', quantity: 3 },
  { topping: 'cherry', quantity: 2 },
  { topping: 'chocolate', quantity: 10 },
];

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json( {error: null, data: cheeseCakeData });
});

module.exports = router;