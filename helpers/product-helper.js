const db = require('../config/connection');
const collection = require('../config/collections');
const objectId = require('mongodb').ObjectId;

module.exports = {
    addProduct: (product) => {
        return new Promise((resolve, reject) => {
            const dbConnection = db.get();
            if (!dbConnection) {
                return reject(new Error('Database not connected'));
            }

            dbConnection.collection(collection.PRODUCT_COLLECTION).insertOne(product)
                .then((data) => {
                    console.log(data);
                    resolve(data.insertedId);
                })
                .catch((err) => {
                    console.error('Error occurred while adding product:', err);
                    reject(err);
                });
        });
    },

    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            const dbConnection = db.get();
            if (!dbConnection) {
                return reject(new Error('Database not connected'));
            }

            dbConnection.collection(collection.PRODUCT_COLLECTION).find().toArray()
                .then((products) => {
                    resolve(products);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching products:', err);
                    reject(err);
                });
        });
    },

    deleteProduct: (placeId) => {
        return new Promise((resolve, reject) => {
            const dbConnection = db.get();
            if (!dbConnection) {
                return reject(new Error('Database not connected'));
            }

            dbConnection.collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(placeId) })
                .then((response) => {
                    if (response.deletedCount === 1) {
                        console.log('Place deleted successfully:', response);
                        resolve(response);
                    } else {
                        console.error('Place not found:', response);
                        reject(new Error('Place not found'));
                    }
                })
                .catch((err) => {
                    console.error('Error occurred while deleting place:', err);
                    reject(err);
                });
        });
    }
};
