const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.beerController.getBeers(res);
});

router.post("/create", (req, res) => {
  Controllers.beerController.createBeer(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.beerController.updateBeer(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.beerController.deleteBeer(req, res);
});

router.get("/search/:column/:term", (req, res) => {
  Controllers.beerController.searchBeerCategory(req, res);
});

module.exports = router;
