var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');   

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// UN SEUL FICHIER - single - req.file
// router.post('/uploaddufichier', upload.single('monfichier'), function (req, res, next) {
//   fs.rename(req.file.path, 'public/images/'+req.file.originalname, function(err) {
//     if (err) {
//       res.send('un problème est survenu');
//     } else {
//       res.send('Succès');
//     }
//   })
// })

// PLUSIEURS FICHIERS - array - req.files
router.post('/monupload', upload.array('monfichier', 3), function (req, res, next) {
  req.files.forEach(file => fs.rename(file.path, 'public/images/' + file.originalname, (err) => {
    
    if (err) {
      res.send('un problème est survenu');
    } else if (file.size > 1024*1024*3) {
        res.send('Fichier trop lourd')
    } else if (file.mimetype !== 'image/png') {
        res.send('Seulement le format .png est accepté')
    } else {
      res.send('Succès');
    }
  }))
})


module.exports = router;
