const Hero = require("../models/hero.model");

exports.createHeroService = async (data) => {
  const hero = await Hero.create(data);
  return hero;
};
exports.deleteHeroService = async (id) => {
  const hero = await Hero.deleteOne({ _id: id });
  return hero;
};

exports.updateHeroService = async (id, data) => {
  const hero = await Hero.updateOne({ _id: id }, data);
  return hero;
};
exports.getHeroByIdService = async (id) => {
  const hero = await Hero.findOne({ _id: id });
  return hero;
};
