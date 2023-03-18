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
const mongoose = require('mongoose');
const { category_create_post } = require('./categoryController');

exports.index = (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find({}, "name stock", callback);
      },
      categories(callback) {
        Category.find(callback);
      },
      brands(callback) {
        Brand.find(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("pages/item_list", {
        title: "All items",
        items: results.items,
        categories: results.categories,
        brands: results.brands,
      });
    }
  );
};

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id)
    .sort({ name: 1 })
    .populate("brand")
    .populate("category")
    .exec(function (err, item) {
      if (err) {
        return next(err);
      }
      res.render("pages/item_detail", { title: "Item Detail", item })
    })
}

exports.item_create_get = (req, res, next) => {
  async.parallel(
    {
      brands(callback) {
        Brand.find(callback);
      },
      categories(callback) {
        Category.find(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("pages/item_form", {
        title: "Create new item",
        brands: results.brands,
        categories: results.categories,
      });
    }
  );
};

exports.item_create_post = [
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("height").escape(),
  body("durometer", "Durometer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("rating", "Rating must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("color", "Color must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  
  (req, res, next) => {
    const errors = validationResult(req)

    let item;
    const baseProps = {
      name: req.body.name,
      descrption: req.body.descrption,
      brand: req.body.brand,
      price: req.body.price,
      stock: req.body.stock,
    };

    if (req.body.type == 'Deck') item = new Deck({
      ...baseProps,
      width: req.body.width,
      length: req.body.length,
      wheelbase: req.body.wheelbase,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df5e'),
    });

    if (req.body.type == 'Trucks') item = new Trucks({
      ...baseProps,
      width: req.body.width,
      height: req.body.height,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df60'),
    });

    if (req.body.type == 'Wheels') item = new Wheels({
      ...baseProps,
      size: req.body.size,
      durometer: req.body.durometer,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df62'),
    });

    if (req.body.type == 'Bearings') item = new Bearings({
      ...baseProps,
      rating: req.body.rating,
      category: mongoose.Types.ObjectId('640c92e5a35fa5df1a98df64'),
    });

    if (req.body.type == 'Griptape') item = new Griptape({
      ...baseProps,
      color: req.body.color,
      category: mongoose.Types.ObjectId('640c92e5a35fa5df1a98df66'),
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          brands(callback) {
            Brand.find(callback);
          },
          categories(callback) {
            Category.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("pages/item_form", {
            title: "Create new item",
            brands: results.brands,
            categories: results.categories,
          });
        }
      );
      return;
    }

    item.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/catalog/item/${item._id}`)
    })
  }
];

exports.item_delete_get = (req, res, next) => {
  Item.findById(req.params.id)
    .populate("brand")
    .populate("category")
    .exec(function (err, item) {
      if (err) {
        return next(err);
      }
      res.render("pages/item_delete", {
        title: "Delete item",
        item: item,
      })
    });
};

exports.item_delete_post = (req, res, next) => {
  Item.findByIdAndRemove(req.body.itemid, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/items");
  });
}

exports.item_update_get = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("brand")
          .populate("category")
          .exec(callback);
      },
      brands(callback) {
        Brand.find(callback);
      },
      categories(callback) {
        Category.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      res.render("pages/item_form", {
        title: "Update item",
        brands: results.brands,
        categories: results.categories,
        item: results.item,
      });
    }
  );
};

exports.item_update_post = [
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("height").escape(),
  body("durometer", "Durometer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("rating", "Rating must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),
  body("color", "Color must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .optional({ nullable: true, checkFalsy: true }),

  (req, res, next) => {
    const errors = validationResult(req);

    let item;
    const baseProps = {
      name: req.body.name,
      descrption: req.body.descrption,
      brand: req.body.brand,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id
    };

    if (req.body.type == 'Deck') item = new Deck({
      ...baseProps,
      width: req.body.width,
      length: req.body.length,
      wheelbase: req.body.wheelbase,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df5e'),
    });

    if (req.body.type == 'Trucks') item = new Trucks({
      ...baseProps,
      width: req.body.width,
      height: req.body.height,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df60'),
    });

    if (req.body.type == 'Wheels') item = new Wheels({
      ...baseProps,
      size: req.body.size,
      durometer: req.body.durometer,
      category: mongoose.Types.ObjectId('640c92e4a35fa5df1a98df62'),
    });

    if (req.body.type == 'Bearings') item = new Bearings({
      ...baseProps,
      rating: req.body.rating,
      category: mongoose.Types.ObjectId('640c92e5a35fa5df1a98df64'),
    });

    if (req.body.type == 'Griptape') item = new Griptape({
      ...baseProps,
      color: req.body.color,
      category: mongoose.Types.ObjectId('640c92e5a35fa5df1a98df66'),
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          item(callback) {
            Item.findById(req.params.id)
              .populate("brand")
              .populate("category")
              .exec(callback);
          },
          brands(callback) {
            Brand.find(callback);
          },
          categories(callback) {
            Category.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("pages/item_form", {
            title: "Update item",
            item: results.item,
            brands: results.brands,
            categories: results.categories,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    Item.findByIdAndUpdate(req.params.id, item, { overwriteDiscriminatorKey: true, new: true }, (err, theitem) => {
      if (err) {
        return next(err);
      }

      res.redirect(`/catalog/item/${theitem._id}`)
    })
  }
]
