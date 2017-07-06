#!/usr/bin/env node --harmony
var csvToJson = require('csvtojson');
var program = require('commander');
var firebase = require('firebase');

program
  .version("0.0.1")
  .description('Upload data from csv to your firebase database')
  .arguments('<csv> <firebaseConfig> <reference> <keyName>')
  .action(function(csv, firebaseConfig, dbReference, keyName) {
    csvFile = csv;
    config = firebaseConfig;
    reference = dbReference;
    key = keyName;
  })
  .parse(process.argv);

if (typeof csvFile === 'undefined' || typeof config === 'undefined') {
   console.error('Please provide a valid csv file and firebase config');
   process.exit(1);
}

var fs = require('fs');
var config = JSON.parse(fs.readFileSync(config, 'utf8'));
var firebase = firebase.initializeApp(config);

const converter = csvToJson({
  ignoreEmpty: true,
});

csvToJson()
  .fromFile(csvFile)
    .on('json', function(jsonObj) {
      var childName = jsonObj[key];
      firebase
        .database()
        .ref(reference)
        .child(childName)
        .set(jsonObj, function(error) {
          if(error) {
            console.log("There was some error uploading the data.");
            process.exit(1);
          } else {
            console.log("Done !");
            process.exit(0);
          }
        });
    });
