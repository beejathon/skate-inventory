const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { discriminatorKey: "__type" };

const ItemSchema = new Schema({ 
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  stock: { type: Number, required: true},
  added: { type: Date, default: Date.now(), required: true }, 
}, options)

const Item = mongoose.model("Item", ItemSchema);

const Deck = Item.discriminator("Deck",
  new Schema({
    width: { type: Number, min: 7, max: 11, required: true },
    length: { type: Number, min: 27, max: 40, required: true },
    wheelbase: { type: Number, min: 11, max: 15, required: true },
  }))

const Trucks = Item.discriminator("Trucks",
  new Schema({
    width: { type: Number, min: 5 , max: 7, required: true },
    height: { type: String, enum: ["Low", "Mid", "High"], required: true },
  }))

const Wheels = Item.discriminator("Wheels",
  new Schema({
    size: { type: Number, min: 50, max: 65, required: true },
    durometer: { type: String, required: true },
  }))

const Bearings = Item.discriminator("Bearings",
  new Schema({
    rating: { type: String, required: true },
  }, options))

const Griptape = Item.discriminator("Griptape",
  new Schema({
    color: { type: String, required: true },
  }))

// Virtual for item URL -- doesn't work, not sure why!
// ItemSchema.virtual("url").get(function() {
//   return `/catalog/item/${this._id}`;
// })

module.exports = { 
  Item,
  Deck, 
  Trucks, 
  Wheels, 
  Bearings, 
  Griptape 
};