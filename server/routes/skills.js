const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill'); // ✅ This must point to your correct Skill model file
const auth = require('../middleware/auth'); // ✅ Correct path to auth middleware


// Get only logged-in user's skills
router.get('/', auth, async (req, res) => {
  const skills = await Skill.find({ user: req.user.id });
  res.json(skills);
});

// Create a skill tied to user
router.post('/', auth, async (req, res) => {
  const { name, level } = req.body;
  const skill = await Skill.create({ name, level, user: req.user.id });
  res.json(skill);
});

// Update a skill only if it belongs to user
router.put('/:id', auth, async (req, res) => {
  const skill = await Skill.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(skill);
});

// Delete a skill only if it belongs to user
router.delete('/:id', auth, async (req, res) => {
  await Skill.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;