var express = require('express');
var router = express.Router();
const async = require('async')
const { 
  Item,
  Deck,
  Trucks,
  Wheels,
  Bearings,
  Griptape,
} = require('../models/item')
const Brand = require('../models/brand');
const Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      deck_count(callback) {
        Deck.countDocuments({}, callback);
      },
      trucks_count(callback) {
        Trucks.countDocuments({}, callback);
      },
      wheels_count(callback) {
        Wheels.countDocuments({}, callback);
      },
      bearings_count(callback) {
        Bearings.countDocuments({}, callback);
      },
      griptape_count(callback) {
        Griptape.countDocuments({}, callback);
      },
      brand_count(callback) {
        Brand.countDocuments({}, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback)
      },
    },
    (err, results) => {
      res.render('pages/index', {
        title: 'Home',
        error: err,
        data: results,
      })
    }
  );
});

module.exports = router;
