var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helper')

router.get('/', async (req, res) => {
  try {
    let products = await productHelper.getAllProducts();
    res.render('admin/view-place', { products });
  } catch (err) {
    console.error('Error occurred while fetching products:', err);
    res.status(500).send('Error occurred while fetching products');
  }
});

router.get('/add-place',function(req,res){
  res.render('admin/add-place')
});

router.post('/add-place', (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    res.send('<script>alert("Successful! : New Place Added"); window.location.href = "/admin/add-place";</script>');
  });
});


router.get('/delete-place/:id', (req, res) => {
  let placeId = req.params.id;
  productHelper.deleteProduct(placeId).then((response) => {
    res.send('<script>alert("Place Deleted Successfully"); window.location.href = "/admin";</script>');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error occurred while deleting place');
  });
});


module.exports = router;