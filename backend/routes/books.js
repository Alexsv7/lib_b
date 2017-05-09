var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bodyParser = require("body-parser");
var multer = require("multer");
var db = mongojs('mongodb://alexsv7:28081997sv@ds127341.mlab.com:27341/lib_bip', ['books']);
var app = express();

class BookModel {
    constructor(name,author,src,isPersonal,thumbnail){
        this.name = name;
        this.author = author;
        this.src = src;
        this.isPersonal = isPersonal;
        this.thumbnail = thumbnail;
    }
}


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

// router.post("/upload", multer({dest: "./uploads/"}).array("uploads", 12), function (req, res) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.send(req.files);
// });

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/files');
        // /Users/alex/bip_lib/PersonalLibrary/frontend/src/assets/files
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
router.post('/upload', function(req, res) {
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }else {
            var book = new BookModel(req.file.originalname, '',"/assets/files/"+req.file.filename,false,"/assets/images/default.jpg");

            db.books.save(book, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        }
    });
});


module.exports = router;