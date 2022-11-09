import axios from "axios";

const api = axios.create({
    // https://us1.locationiq.com/v1/reverse?key=pk.a6364d20957b04aac85c76e812c5cff0&lat=51.503741&lon=-0.10319511&format=json
    // baseURL: "https://us1.locationiq.com/v1/reverse?key=pk.a6364d20957b04aac85c76e812c5cff0"
    baseURL: "https://us1.locationiq.com/v1/"
});

export default api;