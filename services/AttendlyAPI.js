import axios from "axios";

// const serverIpAddress = "192.168.1.105";
// const serverIpAddress = "192.168.100.151";
const serverIpAddress = "192.168.104.155";

export const baseURL = `http://${serverIpAddress}/attend.ly-backend.test`;
export const baseURLWithAPI = baseURL + "/api";

const AttendlyAPI = axios.create({
  baseURL: baseURLWithAPI,
});

export default AttendlyAPI;
