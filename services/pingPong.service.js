const PingPong = require("../models/pingPong.model");

exports.createPingPongService = async (data) => {
  const pingPong = await PingPong.create(data);
  return pingPong;
};
exports.deletePingPongService = async (id) => {
  const pingPong = await PingPong.deleteOne({ _id: id });
  return pingPong;
};

exports.updatePingPongService = async (id, data) => {
  const pingPong = await PingPong.updateOne({ _id: id }, data);
  return pingPong;
};
exports.getPingPongByIdService = async (id) => {
  const pingPong = await PingPong.findOne({ _id: id });
  return pingPong;
};
