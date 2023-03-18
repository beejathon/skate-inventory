const async = require('async');
const { body, validationResult } = require('express-validator')
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

exports.brand_create_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}

exports.brand_list = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
}
