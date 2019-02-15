'use strict';
var express = require('express');
var app = express();

var MarcoPoloHelper = require('./helpers/marco-polo');
var UserStoryHelper = require('./helpers/user-story');
MarcoPoloHelper.generateSeries();

// Routes to different problems
app.get('/marco-polo', (req, res) => {
  res.send(MarcoPoloHelper.getSeries());
})
app.get('/top-secret', function(req, res) {
	UserStoryHelper.getTopSecret((err, resp) => {
    if (resp)
      res.send(resp);
    else
      res.status(500)
	})
})

app.get('/parse-numbers', function(req, res) {
	UserStoryHelper.parseInvoiceNumbers((err, resp) => {
    if (resp)
      res.send(resp);
    else
      res.status(500);
	});
})
app.listen(3000, function () {
  console.log('port 3000!')
})

module.exports = app;