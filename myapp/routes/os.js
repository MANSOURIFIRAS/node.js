var express = require('express');
var router = express.Router();
var os= require('os');

/* GET os details */
router.get('/', function(req, res, next) {
    res.json({
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
    });
});

/* Get cpus list */
router.get('/cpus', function(req, res, next){
    res.json(os.cpus());
});

/* Get one cpu details */
router.get('/cpus/:id', function(req, res, next){
    var cpus= os.cpus();
    const id= req.params.id;
    if(id>=cpus.length){
        res.send("cpu id not exist ! ");
    }else{
        res.send(cpus[id]);
    }
});


module.exports = router;
