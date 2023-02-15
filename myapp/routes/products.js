var express = require('express');
var router = express.Router();
var products = require('../products.json')

/* Get products list */
router.get('/', function(req, res, next){
    res.json({products});
});

/* Get product details by id */
router.get('/:id', function(req, res, next){
    const id= req.params.id;
    const product= products[id];
    if(product!=null){
        res.send(product);
    }
    else{
        res.status(404)
        res.send('product not found');
    }
});

router.get('/:id/:qt', function(req, res, next){
    const id= req.params.id;
    if(products[id] != null){
        const qt= req.params.qt;
        const unit_price= (products[id]).price;
        const total_price= unit_price*qt;
        res.json({id:id, qt:qt,unit_price:unit_price,total_price:total_price});
    }
    else{
        res.status(404)
        res.send('product not found');
    }
});

/* Get products list */
router.get('/search/instock/:qt', function(req, res, next){
    const qt= req.params.qt;
    AllProducts= Object.values(products);
    const inStock=AllProducts.filter((elem)=>{
        return elem.stock<=qt;
    })
    if(inStock.length<=0){
        res.send("not in stock ! ")
    }else{
        res.send(inStock);
    }
});


module.exports = router;
