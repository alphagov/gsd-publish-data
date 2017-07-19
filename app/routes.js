var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('route-one', function (req, res) {
  // get the answer from the query string (eg. ?over18=false)
  var numberServices = req.query.numberServices

  if (numberServices === 'more') {
    // redirect to the relevant page
    res.redirect('route-more')
  } else {
    // if numberServices is any other value (or is missing) render the page requested
    res.render('route-one')
  }
})

module.exports = router