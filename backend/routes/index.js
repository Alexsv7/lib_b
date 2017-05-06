var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
    res.send("index file")
})

module.exports = router;