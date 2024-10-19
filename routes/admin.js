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
})
router.post('/add-place',(req,res)=>{

  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.image;
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render("admin/add-place");
      }else{
        console.log(err);
      }
    })

  })
})

module.exports = router;