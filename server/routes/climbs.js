const router = require('express').Router();
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');
const climbController = require('../controllers/climb.controller');

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
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
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
})

router.get('/', checkAuth, climbController.getClimbs);
router.get('/usergroup', checkAuth, climbController.climbsPerUser);
router.get('/:id', checkAuth, climbController.getClimb);
router.post('/add', checkAuth, upload.single('image'), climbController.addClimb);
router.patch('/update/:id', checkAuth, upload.single('image'), climbController.updateClimb);
router.delete('/:id', checkAuth, climbController.deleteClimb);

module.exports = router;