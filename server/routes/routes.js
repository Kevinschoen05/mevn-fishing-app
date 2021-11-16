const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");

//multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.fetchAllRecords);
//router.get("/:id", API.fetchRecordByID);
router.get('/:reservoir', API.fetchRecordsByReservoir);
router.post("/", upload, API.insertRecord);
router.patch("/:id", upload, API.updateRecord);
router.delete("/:id", API.deleteRecord);


module.exports = router;
