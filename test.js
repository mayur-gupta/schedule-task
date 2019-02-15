var assert = require('assert');
var chai = require('chai');
var server = require('./index');
var chaiHttp  = require('chai-http');
var async = require('async');
var fs = require('fs');
chai.use(chaiHttp);
// Test cases for marcopolo game api

describe('/GET marco-polo', function() {
  it('successfully getting the result', function(done) {
    chai.request(server).get('/marco-polo').end(function(err, res) {
      let status = false;
      if (res && res.text && res.text.constructor === String)
        status = true;
      assert.equal(status, true);
      done();
    });
    650408454
    
  });

  it('hitting the api 5 users parallely ', function(done) {
    async.times(5, function(n, next) {
      chai.request(server).get('/marco-polo').end(function(err, res) {
        let status = false;
        if (res && res.text && res.text.constructor === String)
          status = true;
        if (status) {
          next();
        } else {
          next('err');
        }
      });
    }, function(err, users) {
      // we should now have 5 users
      assert.equal(err, null);
      done();
    });
  });

  describe('/GET top-secret', function() {
    it('successfully write the result in file', function(done) {
      chai.request(server).get('/top-secret').end(function(err, res) {
        assert.equal(err, null);
        assert.equal(JSON.parse(res.text).status == 1, true);
        done();
      });
    });
   
     it('write the correct output to file', function(done) {
      fs.readFile('output_top_secret_new.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.split("\n");
        assert.equal(result[0], "600143155");
        assert.equal(result[1], "650408454");
        assert.equal(result[2], "????????? ILLEGAL");
        done();
      })
    });
  });
  
  
  // Test cases for parse-numbers
  describe('/GET parse-numbers', function() {
    it('successfully write the result in file', function(done) {
      chai.request(server).get('/parse-numbers').end(function(err, res) {
        assert.equal(err, null);
        assert.equal(JSON.parse(res.text).status == 1, true);
        done();
      });
    });

    it('write the correct output to file', function(done) {
      fs.readFile('output_user_story_new.txt', 'utf8', function (err,data) {
        if (err) {
          console.log(err);
        }
        var result = data.split("\n");
        assert.equal(result[0], "600143155");
        assert.equal(result[1], "650408454");
        done();
      });
    });
  });
})