const fs = require('fs');
let Climb = require('../models/climb.model');

exports.getClimbs = (req, res) => {
  Climb.find()
    .then(climbs => res.json(climbs))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.addClimb = (req, res) => {
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }
  const username = req.body.username;
  const image = req.file.path;
  const description = req.body.description;
  const grade = Number(req.body.grade);
  const attempts = Number(req.body.attempts);
  const date = Date.parse(req.body.date);

  const newClimb = new Climb({ username, image, description, grade, attempts, date });

  newClimb.save()
    .then(() => res.json('Climb added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.getClimb = (req, res) => {
  Climb.findById(req.params.id)
    .then(climb => res.json(climb))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteClimb = async (req, res) => {
  const climb = await Climb.findById(req.params.id);
  if (climb.image) {
    fs.unlink(climb.image, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
        return res.status(500).json('Error deleting image file');
      }
    });
  }

  await Climb.findByIdAndDelete(req.params.id)
    .then(climb => res.json('Climb deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateClimb = async (req, res) => {

  await Climb.findById(req.params.id)
    .then(climb => {
      if (!climb) {
        return res.status(404).json('Climb not found.');
      }
      // Only update image if a new one is uploaded
      if (req.file) {
        fs.unlink(climb.image, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
            return res.status(500).json('Error deleting image file');
          }
        });
        climb.image = req.file.path;
      }

      if (req.body.username) climb.username = req.body.username;
      if (req.body.description) climb.description = req.body.description;
      if (req.body.grade) climb.grade = Number(req.body.grade);
      if (req.body.attempts) climb.attempts = Number(req.body.attempts);
      if (req.body.date) climb.date = Date.parse(req.body.date);

      climb.save()
        .then(() => res.json('Climb updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}