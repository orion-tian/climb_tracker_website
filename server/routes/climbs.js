const router = require('express').Router();
const multer = require('multer');
let Climb = require('../models/climb.model');

// Set up Multer for file storage
function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || // accept .jpeg, png, jpg images
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // limit the size of uploaded file to 1MB
  },
  fileFilter: fileFilter
})

router.route('/').get((req, res) => {
  Climb.find()
    .then(climbs => res.json(climbs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('img'), (req, res) => {
  console.log('File:', req.file);
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }

  const username = req.body.username;
  const description = req.body.description;
  const grade = Number(req.body.grade);
  const date = Date.parse(req.body.date);
  const image = req.file.buffer;

  console.log('File:', req.file);

  const newClimb = new Climb({ username, description, grade, date, image });

  newClimb.save()
    .then(() => res.json('Climb added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Climb.findById(req.params.id)
    .then(climb => res.json(climb))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Climb.findByIdAndDelete(req.params.id)
    .then(climb => res.json('Climb deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(upload.single('img'), (req, res) => {
  Climb.findById(req.params.id)
    .then(climb => {
      climb.username = req.body.username;
      climb.description = req.body.description;
      climb.grade = Number(req.body.grade);
      climb.date = Date.parse(req.body.date);
      climb.image = req.file.buffer;

      climb.save()
        .then(() => res.json('Climb updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;