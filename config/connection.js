const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=function(done){
    const url='mongodb+srv://workgkm:godlyad345@clusterparkingapp.htl7b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterParkingApp'
    const dbname='ParkingApptest'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })
}

module.exports.get=function(){
    return state.db
}