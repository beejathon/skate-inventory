#! /usr/bin/env node

console.log('This script populates items to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const { 
  Deck,
  Trucks,
  Wheels,
  Bearings,
  Griptape,
} = require('./models/item')
const Brand = require('./models/brand')
const Category = require('./models/category')


const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const items = [];
const brands = [];
const categories = [];

function deckCreate(name, description, brand, category, price, width, length, wheelbase, stock, added, cb) {
  const deck = new Deck({
    name: name, 
    description: description, 
    brand: brand,
    category: category,
    price: price,
    width: width,
    length: length,
    wheelbase: wheelbase,
    stock: stock,
    added: added,
  });
       
  deck.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + deck);
    items.push(deck)
    cb(null, deck)
  }  );
}

function trucksCreate(name, description, brand, category, price, width, height, stock, added, cb) {
  const trucks = new Trucks({
    name: name, 
    description: description, 
    brand: brand,
    category: category,
    price: price,
    width: width,
    height: height,
    stock: stock,
    added: added,
  });
       
  trucks.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + trucks);
    items.push(trucks)
    cb(null, trucks)
  }  );
}

function wheelsCreate(name, description, brand, category, price, size, durometer, stock, added, cb) {
  const wheels = new Wheels({
    name: name, 
    description: description, 
    brand: brand,
    category: category,
    price: price,
    size: size,
    durometer: durometer,
    stock: stock,
    added: added,
  });
       
  wheels.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + wheels);
    items.push(wheels)
    cb(null, wheels)
  }  );
}

function bearingsCreate(name, description, brand, category, price, rating, stock, added, cb) {
  const bearings = new Bearings({
    name: name, 
    description: description, 
    brand: brand,
    category: category,
    price: price,
    rating: rating,
    stock: stock,
    added: added,
  });
       
  bearings.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + bearings);
    items.push(bearings)
    cb(null, bearings)
  }  );
}

function griptapeCreate(name, description, brand, category, price, color, stock, added, cb) {
  const griptape = new Griptape({
    name: name, 
    description: description, 
    brand: brand,
    category: category,
    price: price,
    color: color,
    stock: stock,
    added: added,
  });
       
  griptape.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + griptape);
    items.push(griptape)
    cb(null, griptape)
  }  );
}

function brandCreate(name, cb) {
  const brand = new Brand({ name: name });
       
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand)
  }  );
}

function categoryCreate(name, cb) {
  const category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function createBrandsCategories(cb) {
    async.series([
        function(callback) {
          brandCreate('Bones', callback);
        },
        function(callback) {
          brandCreate('Birdhouse', callback);
        },
        function(callback) {
          brandCreate('Bronson', callback);
        },
        function(callback) {
          brandCreate('Chocolate', callback);
        },
        function(callback) {
          brandCreate('Enjoi', callback);
        },
        function(callback) {
          brandCreate('Girl', callback);
        },
        function(callback) {
          brandCreate('Grizzly', callback);
        },
        function(callback) {
          brandCreate('Independent', callback);
        },
        function(callback) {
          brandCreate('Krooked', callback);
        },
        function(callback) {
          brandCreate('Krux', callback);
        },
        function(callback) {
          brandCreate('MOB', callback);
        },
        function(callback) {
          brandCreate('Plan B', callback);
        },
        function(callback) {
          brandCreate('Royal', callback);
        },
        function(callback) {
          brandCreate('Santa Cruz', callback);
        },
        function(callback) {
          brandCreate('Spitfire', callback);
        },
        function(callback) {
          brandCreate('Thunder', callback);
        },
        function(callback) {
          categoryCreate('Deck', callback);
        },
        function(callback) {
          categoryCreate('Trucks', callback);
        },
        function(callback) {
          categoryCreate('Wheels', callback);
        },
        function(callback) {
          categoryCreate('Bearings', callback);
        },
        function(callback) {
          categoryCreate('Griptape', callback);
        },
        ],
        // optional callback
        cb);
}

function createItems(cb) {
    async.series([
        function(callback) {
          deckCreate('Enjoi x WWE Barletta Body Slam R7 Skateboard Deck - 8"', 'Enjoi have teamed up with WWE to make an amazing limited series of boards, all featuring classic WWE characters, with one for each pro rider. This board is for Louie Barletta and features an artist drawing of "Ultimate Warrior".', brands[4], categories[0], 34.95, 8, 31.6, 14, 50, Date.now(), callback);
        },
        function(callback) {
          trucksCreate('Independent Stage 11 Forged Titanium 139 Standard Trucks - Silver', 'The Independent Stage 11 Forged Titanium 139 Standard Trucks come in a lovely silver colourway, and are an expertly designed set of lightweight trucks from the always on-point Independent. They are 15% lighter than the standard Stage 11 trucks, and are made of forged titanium for resilience and strength on top of their lightweight feel. Designed to fit boards between 7.75" and 8.2" wide. Standard Height.', brands[7], categories[1], 89.95, 5.25, 'High', 44, Date.now(), callback);
        },
        function(callback) {
          wheelsCreate('Bones Desert Skull V4 100s Wide Skateboard Wheels 100a', 'The Bones Desert Skull wheels feature the classic wide shape which is great for locking into and holding grinds.', brands[0], categories[2], 41.95, 53, '100A', 24, Date.now(), callback)
        },
        function(callback) {
          bearingsCreate('Bones REDS Bearings', 'The most iconic and classic bearings on the market, Bones REDS are the most used bearings in skateboarding, and for good reason. With removable rubber shields for easy cleaning, a high speed nylon ball retainer, and built for skateboarding, they come pre lubricated with Speed Cream and are ready to roll. 8 red bearings and a sticker included as always!', brands[0], categories[3], 29.95, 'ABEC 9', 100, Date.now(), callback)
        },
        function(callback) {
          griptapeCreate('MOB x Slayer 9" Grip Tape Sheet', `MOB team up with Slayer to deliver on a 9" grip tape sheet endowed with the band's iconic logo.`, brands[10], categories[4], 14.95, 'Black', 100, Date.now(), callback)
        }
        ],
        // optional callback
        cb);
}

async.series([
    createBrandsCategories,
    createItems,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




