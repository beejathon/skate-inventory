const async = require('async');
const { body, validationResult } = require('express-validator')
const { Item } = require('../models/item')
const Category = require('../models/category');

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items(callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("pages/category_detail", {
        title: "Category Detail",
        category: results.category,
        items: results.items,
      });
    }
  );
}

exports.category_create_get = (req, res, next) => {
  res.render("pages/category_form", { title: "Create Category" });
}

exports.category_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("pages/category_form", {
        title: "Create Category",
        category: req.body,
        errors: errors.array(),
      });
      return;
    }

    const category = new Category({
      name: req.body.name,
    });
    category.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(category.url)
    });
  },
];

exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items(callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        res.redirect("/catalog");
      }
      res.render("pages/category_delete", {
        title: "Delete Category",
        category: results.category,
        items: results.items,
      });
    }
  );
}

exports.category_delete_post = (req, res, next) => {
  Category.findByIdAndRemove(req.body.categoryid, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog");
  });
}

exports.category_update_get = (req, res, next) => {
  Category.findById(req.params.id)
    .exec(function(err, category) {
      if (err) {
        return next(err);
      }
      if (category === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("pages/category_form", {
        title: "Update Category",
        category,
      });
    });
}

exports.category_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty."),
  
  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Category.findById(req.params.id)
        .exec(function(err, category) {
          if (err) {
            return next(err);
          }
          res.render("pages/category_form", {
            title: "Update Category",
            category,
          });
        });
      return;
    }

    Category.findByIdAndUpdate(req.params.id, category, {}, (err, thecategory) => {
      if (err) {
        return next(err);
      }

      res.redirect(thecategory.url)
    });
  }
]
