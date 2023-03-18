const express = require('express');
const router = express.Router();

// Controller modules.
const item_controller = require('../controllers/itemController');
const brand_controller = require('../controllers/brandController');
const category_controller = require('../controllers/categoryController');

/// INVENTORY ROUTES ///

// GET catalog home page.
router.get('/', item_controller.index);

// GET request for creating an item.
router.get('/item/create', item_controller.item_create_get);

// POST request for creating an item.
router.post('/item/create', item_controller.item_create_post);

// GET request to delete an item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete an item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update an item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update an item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one item.
router.get('/item/:id', item_controller.item_detail);

/// BRAND ROUTES ///

// GET request for creating a brand. 
router.get('/brand/create', brand_controller.brand_create_get);

// POST request for creating a brand. 
router.post('/brand/create', brand_controller.brand_create_post);

// GET request to delete a brand.
router.get('/brand/:id/delete', brand_controller.brand_delete_get);

// POST request to delete a brand.
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

// GET request to update a brand.
router.get('/brand/:id/update', brand_controller.brand_update_get);

// POST request to update a brand.
router.post('/brand/:id/update', brand_controller.brand_update_post);

// GET request for one brand.
router.get('/brand/:id/', brand_controller.brand_detail);

/// CATEGORY ROUTES ///

// GET request to create a category.
router.get('/category/create', category_controller.category_create_get);

// POST request to create a category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete a category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete a category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update a category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update a category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

module.exports = router;
