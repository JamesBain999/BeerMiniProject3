"use strict";
let Models = require("../models");
const { Op } = require("sequelize");

const getBeers = (res) => {
  Models.Beer.findAll({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createBeer = (data, res) => {
  console.log(data);
  new Models.Beer(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateBeer = (req, res) => {
  Models.Beer.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteBeer = (req, res) => {
  Models.Beer.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const searchBeerCategory = (req, res) => {
  const searchTerm = req.params.term;
  const searchColumn = req.params.column;

  if (!searchTerm || !searchColumn) {
    return res
      .status(400)
      .send({ result: 400, error: "Search term and column are required." });
  }

  Models.Beer.findAll({
    where: {
      [searchColumn]: {
        [Op.like]: `%${searchTerm}%`,
      },
    },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  searchBeerCategory,
};
