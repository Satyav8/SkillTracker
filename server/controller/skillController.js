const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
};

exports.addSkill = async (req, res) => {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
};

exports.updateSkill = async (req, res) => {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
};

exports.deleteSkill = async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
};

