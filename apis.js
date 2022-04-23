const axios = require("axios");

module.exports = {
  getCafeterias,
  getConferences,
  bookConference,
  getBookedSlots,
};

const base_url = 'http://43.204.101.59:8080'
// const base_url = "http://localhost:8080";

async function getCafeterias() {
  const res = await axios.get(`${base_url}/cafeteria`);
  return res.data;
}

async function getConferences() {
  const url = `${base_url}/conference_room`;
  const res = await axios.get(url);
  return res.data;
}

async function bookConference(data) {
  try {
    console.log("Booking Conference ", data);
    const res = await axios.post(`${base_url}/conference_room/book`, data);
    console.log("res book ", res);

    return res.data;
  } catch (e) {
    console.error("Error is ", e);
    return []
  }
}

async function getBookedSlots() {
  const res = await axios.get(`${base_url}/conference_room/booked/slots`, data);
  return res.data;
}

async function bookTT() {
  const res = await axios.get(`${base_url}/conference_room/booked/slots`, data);
  return res.data;
}
