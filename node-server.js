let express = require("express");
let bodyParser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(bodyParser.json());
app.use("/assets", express.static("assets"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tasks", function (req, res) {
  res.sendFile(__dirname + "/assets/data/taskList.json");
});

app.post("/", function (req, res) {
  const newLocal = req.body;
  console.log(`Payload: ${JSON.stringify(newLocal)}`);
  fs.writeFile(
    __dirname + "/assets/data/taskList.json",
    JSON.stringify(req.body),
    "utf-8",
    function (error) {
      if (error) throw error;
      console.log("File save successful");
    }
  );
  res.sendStatus(200);
});

app.listen(3000);
