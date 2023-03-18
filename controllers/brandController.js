const async = require('async');
const { body, validationResult } = require('express-validator')
const { Item } = require('../models/item')
const Brand = require('../models/brand');

exports.brand_detail = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      items(callback) {
        Item.find({ brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("pages/brand_detail", {
        title: "Brand Detail",
        brand: results.brand,
        items: results.items,
      });
    }
  );
};

exports.brand_create_get = (req, res, next) => {
  res.render("pages/brand_form", { title: "Create Brand" });
}

exports.brand_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("pages/brand_form", {
        title: "Create Brand",
        brand: req.body,
        errors: errors.array(),
      });
      return;
    }

    const brand = new Brand({
      name: req.body.name,
    });
    brand.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(brand.url)
    });
  },
];

exports.brand_delete_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      items(callback) {
        Item.find({ brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        res.redirect("/catalog");
      }
      res.render("pages/brand_delete", {
        title: "Delete Brand",
        brand: results.brand,
        items: results.items,
      });
    }
  );
};

exports.brand_delete_post = (req, res, next) => {
  Brand.findByIdAndRemove(req.body.brandid, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog");
  });
}

exports.brand_update_get = (req, res, next) => {
  Brand.findById(req.params.id)
    .exec(function(err, brand) {
      if (err) {
        return next(err);
      }
      if (brand === null) {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
      }
      res.render("pages/brand_form", {
        title: "Update Brand",
        brand,
      });
    });
};

exports.brand_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty."),
  
  (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Brand.findById(req.params.id)
        .exec(function(err, brand) {
          if (err) {
            return next(err);
          }
          res.render("pages/brand_form", {
            title: "Update Brand",
            brand,
          });
        });
      return;
    }

    Brand.findByIdAndUpdate(req.params.id, brand, {}, (err, thebrand) => {
      if (err) {
        return next(err);
      }

      res.redirect(thebrand.url)
    });
  }
]
