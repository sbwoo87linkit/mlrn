var config = require('../config');
var mongoClient = require('mongodb').MongoClient;
var async = require('async');

var ObjectID = require('mongodb').ObjectID;

var db;
var collection;
mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err);
    else {
        db = database;
        console.log("db connected...");
    }
})

exports.get = function (req, res) {
    db.collection('header').findOne({ articleType: req.params.articleType }, function(err, doc) {        
        if (!err) {
            // console.log(doc)
            res.json(doc);
        }
        res.status(500).end(err);
    });
}

exports.update = function (req, res) {
    console.log('req.body', req.body);
    db.collection('header').update({ articleType: req.body.articleType }, req.body, {upsert: true}, function (err, doc) {
        if (!err) {
            res.json(doc);
        }
        console.log(err)
        res.status(500).end();
    });
};


exports.delete = function (req, res) {
    db.collection('header').remove({ _id: ObjectID(req.params.sid) }, function (err, result) {
        if (err) {
            res.send(err)
            return
        }
        res.send();
    });
}
