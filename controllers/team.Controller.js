const Team = require("../models/team.Model");

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});

    // Get total number of documents to calculate the number of pages.
    const count = await Team.countDocuments({});

    res.status(200).json({
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSpecificTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team)
      return res.status(404).json({ message: "Team member not found." });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team)
      return res.status(404).json({ message: "Team member not found." });

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.patchTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team)
      return res.status(404).json({ message: "Team member not found." });

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team)
      return res.status(404).json({ message: "Team member not found." });

    res.status(204).json({ message: "Team member deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
