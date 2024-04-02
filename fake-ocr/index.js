const express = require("express");
const multer = require("multer");
const path = require("node:path");
const readline = require("node:readline");

const app = express();
const port = 8051;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "image" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("image"), (req, res) => {
  rl.question("enter license_plate: ", (license_plates) => {
    const arrLicense_plates = license_plates.split("#");
    res.json(
      arrLicense_plates.map((license_plate) => ({
        license_plate,
        type: "truck",
      }))
    );
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
