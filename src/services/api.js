import axios from "axios";

const api = axios.create({
    baseURL: "https://us1.locationiq.com/v1/directions/driving/"
});

export default api;
