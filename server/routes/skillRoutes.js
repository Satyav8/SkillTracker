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

module.exports = router;
