const db = require('../config/connection');
const collection = require('../config/collections');
const { ObjectId } = require('mongodb'); // Using destructuring for better clarity

module.exports = {
    addProduct: (product) => {
        return new Promise((resolve, reject) => {
            const dbConnection = db.get();
            if (!dbConnection) {
                return reject(new Error('Database not connected'));
            }

            product.createdAt = new Date();
            
            dbConnection.collection(collection.PRODUCT_COLLECTION).insertOne(product)
                .then((data) => {
                    resolve(data.insertedId);
                })
                .catch((err) => {
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
            
            dbConnection.collection(collection.PRODUCT_COLLECTION)
                .find()
                .sort({ createdAt: -1 })
                .toArray()
                .then((products) => {
                    resolve(products);
                })
                .catch((err) => {
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

            // Ensure ObjectId is created properly
            dbConnection.collection(collection.PRODUCT_COLLECTION)
                .deleteOne({ _id: new ObjectId(placeId) }) // Using 'new' here
                .then((response) => {
                    if (response.deletedCount === 1) {
                        resolve(response);
                    } else {
                        reject(new Error('Place not found'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
