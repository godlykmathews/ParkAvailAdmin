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
        const imageFile = req.files?.image; // Handle image file
        const insertedId = await productHelper.addProduct(req.body); // Get inserted ID
        
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

// Render edit place form
router.get('/edit-place/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        const product = await productHelper.getProductById(placeId);

        if (!product) {
            req.session.message = {
                type: 'error',
                text: 'Place not found'
            };
            return res.redirect('/admin');
        }

        res.render('admin/edit-place', {
            product,
            admin: true
        });
    } catch (error) {
        console.error('Error loading edit page:', error);
        req.session.message = {
            type: 'error',
            text: 'Error loading edit page'
        };
        res.redirect('/admin');
    }
});


// Update place
router.post('/edit-place/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        // Update the product data with the submitted form data
        await productHelper.updateProduct(placeId, req.body);

        // Check if an image file is uploaded and handle it
        const imageFile = req.files?.image;
        if (imageFile) {
            await imageFile.mv('./public/product-images/' + placeId + '.jpg');
        }

        req.session.message = {
            type: 'success',
            text: 'Place updated successfully'
        };
        res.redirect('/admin');  // Redirect back to the admin page after update
    } catch (error) {
        req.session.message = {
            type: 'error',
            text: 'Failed to update place'
        };
        res.redirect(`/admin/edit-place/${placeId}`);  // Stay on the edit page if there's an error
    }
});



module.exports = router;
