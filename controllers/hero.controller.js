const Hero = require("../models/hero.model");
const {
  createHeroService,
  deleteHeroService,
  updateHeroService,
  getHeroByIdService,
} = require("../services/hero.service");
// for property post
exports.createHero = async (req, res) => {
  console.log(req.body);
  try {
    const newHero = await createHeroService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newHero,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Hero
exports.getHero = async (req, res) => {
  try {
    let hero = await Hero.find({});
    res.status(200).json({
      status: "success",
      data: hero,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Hero
exports.deleteHero = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteHeroService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update Hero
exports.updateHero = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await updateHeroService(id, req.body);

    if (!hero.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update hero ",
      error: error.message,
    });
  }
};

exports.getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getHeroByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific Hero
exports.getSpecificHero = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let heros = await Hero.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Hero.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: heros,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
