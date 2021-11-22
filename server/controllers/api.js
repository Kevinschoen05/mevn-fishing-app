const Record = require("../models/records");
const fs = require("fs");
const { replaceOne, where } = require("../models/records");

module.exports = class API {
  //fetch all records
  static async fetchAllRecords(req, res) {
    try {
      const records = await Record.find();
      res.status(200).json(records);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  //fetch record by reservoir
  static async fetchRecordsByReservoir(req, res) { 
    const reservoir = req.params.reservoir

    try{
      const records = await Record.find({reservoir :  reservoir})
      res.status(200).json(records)
    }catch(err){
      res.status(404).json({message: err.message})
    }
  }

  static async fetchRecordsByDate(req, res){
    const date = '^' +req.params.date
    try {
      const records = await Record.find({ date: date})
      res.status(200).json(records)
    } catch (err) {
      res.status(404).json({message: err.message})
    }
  }

  //fetch record by ID
  static async fetchRecordByID(req, res) {
    const id = req.params.id;
    try {
      const record = await Record.findById(id);
      res.status(200).json(record);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //insert record
  static async insertRecord(req, res) {
    const record = req.body;
    try {
      await Record.create(record);
      res.status(201).json({ message: "Post Created Successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  //update record by ID
  static async updateRecord(req, res) {
    const id = req.params.id;
    const newPost = req.body;

    try {
      await Record.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post Updated Successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //delete a record
  static async deleteRecord(req, res) {
    const id = req.params.id;
    try {
      const result = await Record.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err.message);
        }
      } 
      res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
