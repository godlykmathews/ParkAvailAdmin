const MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

module.exports.connect = function(done) {
    var url = 'mongodb+srv://workgkm:thisisgkm@clusterparkingapp.htl7b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterParkingApp';
    var dbname = 'test'; // Replace with your actual database name

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) {
            console.error('Database connection failed:', err);
            return done(err);
        }
        state.db = client.db(dbname);
        console.log('Database connection successful');
        done();
    });
};

module.exports.get = function() {
    return state.db;
};
