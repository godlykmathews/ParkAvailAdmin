var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helper')

router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    
    res.render('admin/view-place', { admin: true, products });
  })
 

});

router.get('/add-place',function(req,res){
  res.render('admin/add-place')
});

router.post('/add-place', (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.image;
    image.mv('./public/product-images/' + id + '.jpg', (err) => {
      if (!err) {
        res.send('<script>alert("Successful! : New Place Added"); window.location.href = "/admin/add-place";</script>');
      } else {
        console.log(err);
        res.status(500).send('Error occurred while uploading image');
      }
    });
  });
});


module.exports = router;