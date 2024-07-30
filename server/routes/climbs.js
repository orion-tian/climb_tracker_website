const router = require('express').Router();
const multer = require('multer');
let Climb = require('../models/climb.model');

// Set up Multer for file storage
function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' ||
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
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
  fileFilter: fileFilter
})

router.route('/').get((req, res) => {
  Climb.find()
    .then(climbs => res.json(climbs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('image'), (req, res) => {
  console.log('File:', req.file);
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }

  const username = req.body.username;
  const image = req.file.buffer;
  const description = req.body.description;
  const grade = Number(req.body.grade);
  const attempts = Number(req.body.attempts);
  const date = Date.parse(req.body.date);

  console.log('File:', req.file);

  const newClimb = new Climb({ username, image, description, grade, attempts, date });

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

router.route('/update/:id').post(upload.single('image'), (req, res) => {
  Climb.findById(req.params.id)
    .then(climb => {

      if (!climb) {
        return res.status(404).json('Climb not found.');
      }

      console.log('File:', req.file);
      // Only update image if a new one is uploaded
      if (req.file) {
        climb.image = req.file.buffer;
      }

      climb.username = req.body.username;
      climb.description = req.body.description;
      climb.grade = Number(req.body.grade);
      climb.attempts = Number(req.body.attempts);
      climb.date = Date.parse(req.body.date);

      climb.save()
        .then(() => res.json('Climb updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;