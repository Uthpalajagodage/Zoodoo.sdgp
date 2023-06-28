const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const adminRouter = require("./routes/AdminRoutes");
const foodRouter = require("./routes/ProductRoutes");
const buyHistoryRoute = require("./routes/BuyHistory");
const HealthIssuesRoute = require("./routes/HealthIssueRoute");
const path = require("path");

//create express app
const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

//middleware
app.use(cors());
app.use(express.json());

//routes
//user route
app.use("/users", userRouter);

//admin route
app.use("/admin", adminRouter);

//add food
app.use("/foods", foodRouter);

//buyHistory
app.use("/buyHistory", buyHistoryRoute);

//health issues
app.use("/healthIssues", HealthIssuesRoute);

const port = process.env.PORT || 5000;

//connect to the database
// mongoose.connect(
//   "mongodb+srv://kulunu12:kulunu123@cluster0.kqc6kk4.mongodb.net/Cluster0?retryWrites=true&w=majority"
// );

mongoose.connect(
  "mongodb+srv://doadmin:S08134iY2BKgC6f5@zoodoo-db-4000f2e5.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=zoodoo-db"
);

//listen to port
app.listen(port, () => {
  console.log("app is listening to the port:", port);
});
