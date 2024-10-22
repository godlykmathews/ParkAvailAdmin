var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helper');

// View all places
router.get('/', async (req, res) => {
    try {
        let products = await productHelper.getAllProducts();
        res.render('admin/view-place', { 
            products,
            admin: true
        });
    } catch (err) {
        req.session.message = {
            type: 'error',
            text: 'Error fetching places'
        };
        res.redirect('/admin');
    }
});

// Render add place form
router.get('/add-place', function(req, res) {
    res.render('admin/add-place', { admin: true });
});

// Add new place
router.post('/add-place', async (req, res) => {
    try {
        const imageFile = req.files?.image;
        await productHelper.addProduct(req.body);
        
        if (imageFile) {
            // If you want to handle image upload
            await imageFile.mv('./public/product-images/' + insertedId + '.jpg');
        }

        req.session.message = {
            type: 'success',
            text: 'Place added successfully'
        };
        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding place:', error);
        req.session.message = {
            type: 'error',
            text: 'Failed to add place'
        };
        res.redirect('/admin/add-place');
    }
});

// Delete place
router.get('/delete-place/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        await productHelper.deleteProduct(placeId);
        
        req.session.message = {
            type: 'success',
            text: 'Place deleted successfully'
        };
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting place:', error);
        req.session.message = {
            type: 'error',
            text: 'Failed to delete place'
        };
        res.redirect('/admin');
    }
});

module.exports = router;