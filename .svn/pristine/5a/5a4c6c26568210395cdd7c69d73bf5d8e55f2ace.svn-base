const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const DIR = './src/assets';
var data=require('./baseURL.json');
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
    	// console.log('file');
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, 'Product_Catalog'+ path.extname(file.originalname));
    }
});
console.log(data.object.baseurl);
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', data.object.baseurl);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/upload',upload.array("uploads[]", 12), function (req, res) {	
    if (!req.file) {
        // console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        // console.log('file received');
        return res.send({
          success: true
        })
      }
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});