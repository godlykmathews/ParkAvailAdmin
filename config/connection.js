const MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

module.exports.connect = function(done) {
    var url = 'mongodb+srv://workgkm:thisisgkm@clusterparkingapp.htl7b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterParkingApp';
    var dbname = 'yourDatabaseName';

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) return done(err);
        state.db = client.db(dbname);
        done();
    });
};

module.exports.get = function() {
    return state.db;
};