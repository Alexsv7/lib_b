var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bodyParser = require("body-parser");
var multer = require("multer");
var db = mongojs('mongodb://alexsv7:28081997sv@ds127341.mlab.com:27341/lib_bip', ['books']);
//
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.get('/books', function (req, res, next)  {
    db.books.find(function(error, books) {
    if(error){
        res.send(error);
    }else{
        res.json(books);
}
})
});


router.get('/book/:id', function (req, res, next) {
    db.books.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json(book);
        }
    });
});

// Save book
router.post('/book', function (req, res, next) {
    var book = req.body;
    if (!book.text || !(book.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.books.save(book, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update book
router.put('/book/:id', function (req, res, next) {
    var book = req.body;
    var updObj = {};

    if (book.isCompleted) {
        updObj.isCompleted = book.isCompleted;
    }

    if (book.text) {
        updObj.text = book.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.books.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete book
router.delete('/book/:id', function (req, res, next) {
    db.books.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.post("/upload", multer({dest: "./uploads/"}).array("uploads", 12), function (req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.send(req.files);
});

module.exports = router;