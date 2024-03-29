'use strict';
var	lineByLine 	= require('n-readlines');
var topSecret 	= new lineByLine(__dirname+'/../input_user_story_2.txt');
var fs = require("fs");
var	inputUserStory = new lineByLine(__dirname+'/../input_user_story_1.txt');
var UserStoryHelper = {
  getNumber: (liner) => {
    var digits = {
      " _ | ||_|": 0,
      "     |  |": 1,
      " _  _||_ ": 2,
      " _  _| _|": 3,
      "   |_|  |": 4,
      " _ |_  _|": 5,
      " _ |_ |_|": 6,
      " _   |  |": 7,
      " _ |_||_|": 8,
      " _ |_|  |": 9,
      " _ |_| _|": 9,
    }
  
    var line;
    var lineNumber = 0;
    var lines = []
    var number = [];
    var result = "";
    while (line = liner.next() ) {
      lines[lineNumber] = line.toString('ascii');
      lineNumber++;
      if(lineNumber > 2){
        for(var i = 0; i < lines.length; i++){
           for( var j = 0; j < lines[i].length/3; j++ ){
             if(!number[j]) number[j] = '';
             number[j] = number[j] + lines[i].substr(j*3,3);
          }
      }
      var numberLine = '';
      var isLegal = true;
      for(var i = 0; i < number.length; i++){
        if(digits[number[i]] == undefined) {
          isLegal = false;
          numberLine = numberLine + "?";
        } else {
          numberLine = numberLine + digits[number[i]];
        }
      }
      if(!isLegal) {
        numberLine = numberLine + " ILLEGAL"  +"\n"
      } else {
        numberLine = numberLine + "\n"
      }
      result = result + numberLine;
      line = liner.next();
      lineNumber = 0;
      lines = []
      number = [];
      };
    }
    return result;
  },

  parseInvoiceNumbers: (cb) => {
    let series = UserStoryHelper.getNumber(inputUserStory);
    fs.writeFile('output_user_story_new.txt', series, function (err, data) {
      if (err) {
        cb({status : 0});
      } else {
        cb(null, {status : 1});
      }
      return;
    });
  },

  getTopSecret: (cb) => {
    let series = UserStoryHelper.getNumber(topSecret);
    fs.writeFile('output_top_secret_new.txt', series, function (err, data) {
      if (err) {
        cb({status : 0});
      } else {
        cb(null, {status : 1});
      }
      return;
    });
  }
}

module.exports = UserStoryHelper;