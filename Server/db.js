const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/foodapp";

const MongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);

    const foodItems = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );

    const data = await foodItems.find({}).toArray();
    const categoryData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.food_category = categoryData;
  } catch (err) {
    console.log("DataBase Error", err);
    throw err; // Propagate the error to indicate connection failure
  }
};

module.exports = { MongoDB };
