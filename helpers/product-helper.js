var db = require('../config/connection');
var collection = require('../config/collections');
var objectId = require('mongodb').ObjectId;

module.exports = {
    addProduct: (product, callback) => {
        console.log(product);

        db.get().collection('parkingspots').insertOne(product).then((data) => {
            console.log(data);
            callback(data.insertedId);
        }).catch((err) => {
            console.error('Error occurred while adding product:', err);
            callback(null, err);
        });
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
                resolve(products);
            } catch (err) {
                console.error('Error occurred while fetching products:', err);
                reject(err);
            }
        });
    },
    deleteProduct: (placeId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(placeId) }).then((response) => {
                if (response.deletedCount === 1) {
                    console.log('Place deleted successfully:', response);
                    resolve(response);
                } else {
                    console.error('Place not found:', response);
                    reject(new Error('Place not found'));
                }
            }).catch((err) => {
                console.error('Error occurred while deleting place:', err);
                reject(err);
            });
        });
    }
};