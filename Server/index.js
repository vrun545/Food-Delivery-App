const express = require("express");
const app = express();
const { MongoDB } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// DataBase Connected
MongoDB()
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;

    // Server Listening at PORT: 5000
    app.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


app.get("/", (req, res) => {
  res.send("Hello World !!!");
});



app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/FoodItems"));
app.use("/api", require("./Routes/LoginUser"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrders"));
app.use("/api", require("./Routes/GetUser"));
app.use("/api", require("./Routes/GetLocation"));