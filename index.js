var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer=require('multer');
const path=require('path');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Route to handle file uploads and return metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.file;
  const fileMetadata = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };

  res.status(200).json(fileMetadata); // Return file metadata
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
