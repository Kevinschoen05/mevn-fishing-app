import axios from "axios";
const url = "api/record";
 

export default class API {
  //get all the records
  static async getAllRecords() {
    const res = await axios.get(url);
    return res.data;
  }

  //get records by reservoir
  static async getRecordsByReservoir(reservoir) {
    const res = await axios.get(`${url}/${reservoir}`);
    return res.data;
  }

  //get records for reservoir by date
  static async getRecordsByDate(reservoir, date){
    const res = await axios.get(`${url}/${reservoir}/${date}`)
    return res.data
  }

  //get records by ID
  static async getRecordsByID(id) {
    const res = await axios.post(`${url}/${id}`);
    return res.data;
  }
  //update record
  static async addRecord(id, record) {
    const res = await axios.patch(`${url}/${id}`, record);
    return res.data;
  }
  //delete record
  static async deleteRecord(id, record) {
    const res = await axios.delete(`${url}/${id}`, record);
    return res.data;
  }
}
