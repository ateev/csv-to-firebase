#!/usr/bin/env node --harmony
var csvToJson = require('csvtojson');
var program = require('commander');
var admin = require("firebase-admin");

program
  .version("0.1.2")
  .description('Upload data from csv to your firebase database')
  .arguments('<csv> <firebasePrivateKey> <databaseurl> <reference> <keyName>')
  .action(function(csv, firebasePrivateKey, databaseurl, dbReference, keyName) {
    csvFile = csv;
    config = firebasePrivateKey;
    reference = dbReference;
    key = keyName;
    databaseUrl = databaseurl;
  })
  .parse(process.argv);

if (typeof csvFile === 'undefined' || typeof config === 'undefined') {
   console.error('Please provide a valid csv file and firebase config');
   process.exit(1);
}

var fs = require('fs');
var config = JSON.parse(fs.readFileSync(config, 'utf8'));

var firebase = admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: databaseUrl
});

csvToJson({
  trim:true,
  ignoreEmpty: true,
  checkType:false,
})
  .fromFile(csvFile)
    .on('json', function(jsonObj) {
      var childName = jsonObj[key];
      console.log("Pushing " + childName);
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
