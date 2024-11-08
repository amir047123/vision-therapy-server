const express = require("express");
const app = express();
const cors = require("cors");

const imageUploadRoutes = require("./routes/imageUpload.route");
const userRoutes = require("./routes/user.route");
const smoothMovementRoutes = require("./routes/smoothMovement.route");
const rapidMovementRoutes = require("./routes/rapidMovement.route");
const pingPongRoutes = require("./routes/pingPong.route");
const rainDropRoutes = require("./routes/rainDrop.route");
const matchGaborRoutes = require("./routes/matchGabor.route");
const randomObstacleRoutes = require("./routes/randomObstacle.route");
const searchQuestRoutes = require("./routes/searchQuest.route");
const rockChartRoutes = require("./routes/rockChart.route");
const theShooterRoutes = require("./routes/theShooter.route");
const colorTrapRoutes = require("./routes/colorTrap.route");
const packageRoutes = require("./routes/package.route");
const transactionRoutes = require("./routes/transaction.route");
//product
const productRoutes = require("./routes/product.Routes");
//contact
const contactRoutes = require("./routes/contact.Routes");
//team
const teamRoutes = require("./routes/team.Route");
const orderRoutes = require("./routes/order.Routes");
const heroRoutes = require("./routes/hero.route");
const whyMedmyneRoutes = require("./routes/whyMedmyne.routes");
const doctorReviewRoutes = require("./routes/doctorReview.route");
const growRoutes = require("./routes/grow.route");
const stepsRoutes = require("./routes/steps.route");
const lectureRoutes = require("./routes/lecture.route");
const researchRoutes = require("./routes/research.route");
const userFaqRoutes = require("./routes/userFaq.route");
const userFooters = require("./routes/footer.route");
const brochureRoutes = require("./routes/brochure.route");
const myOrderDetailsRoutes = require("./routes/orderDetails.route");
const doctorFaqRouts = require("./routes/doctorFaq.route");
const patientReviewRoutes = require("./routes/patientReview.route");

//clinical Finding route

const clinicalFindingRouter = require("./routes/clinicalFinding.Router");

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/package", packageRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/upload", imageUploadRoutes);

//..........//...........Game Api.........//........//
app.use("/api/v1/smoothMovement", smoothMovementRoutes);
app.use("/api/v1/rapidMovement", rapidMovementRoutes);
app.use("/api/v1/pingPong", pingPongRoutes);
app.use("/api/v1/rainDrop", rainDropRoutes);
app.use("/api/v1/matchGabor", matchGaborRoutes);
app.use("/api/v1/randomObstacle", randomObstacleRoutes);
app.use("/api/v1/searchQuest", searchQuestRoutes);
app.use("/api/v1/rockChart", rockChartRoutes);
app.use("/api/v1/theShooter", theShooterRoutes);
app.use("/api/v1/colorTrap", colorTrapRoutes);
//..........//...........Game Api.........//........//
//product
app.use("/api/v1/products", productRoutes);
//contact
app.use("/api/v1/contacts", contactRoutes);
//team
app.use("/api/v1/teams", teamRoutes);

//clinical Finding api
app.use("/api/v1", clinicalFindingRouter);
app.use("/api/v1/orders", orderRoutes);

// front end api
app.use("/api/v1/hero", heroRoutes);
app.use("/api/v1/whyMedmyne", whyMedmyneRoutes);
app.use("/api/v1/doctorReview", doctorReviewRoutes);
app.use("/api/v1/grow", growRoutes);
app.use("/api/v1/steps", stepsRoutes);
app.use("/api/v1/lecture", lectureRoutes);
app.use("/api/v1/patientReview", patientReviewRoutes);
app.use("/api/v1/research", researchRoutes);
app.use("/api/v1/brochure", brochureRoutes);
app.use("/api/v1/userFaq", userFaqRoutes);
app.use("/api/v1/doctorFaq", doctorFaqRouts);
app.use("/api/v1/footer", userFooters);
app.use("/api/v1/OrderDetails", myOrderDetailsRoutes);

//get image
app.get("/images/:filename", function (req, res) {
  var filename = req.params.filename;
  res.sendFile(__dirname + "/image/" + filename);
});

// route hit
app.get("/", (req, res, next) => {
  res.send(
    `<h1 style="color:#00ff00;font-size:62px; text-align:center;margin-top:200px">"Database Running with faysal & ifty"</h1>`
  );
});

module.exports = app;
