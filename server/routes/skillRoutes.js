const express = require("express");
const router = express.Router();
const Skill = require("../models/skillModel");

// @desc Add a new skill
router.post("/", async (req, res) => {
  const { name, level } = req.body;
  try {
    const skill = await Skill.create({ name, level });
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ message: "Failed to add skill", error: err });
  }
});

// @desc Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills", error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE SKILL
router.put("/:id", async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
