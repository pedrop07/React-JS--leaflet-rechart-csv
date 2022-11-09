import axios from "axios";

const api = axios.create({
    // https://us1.locationiq.com/v1/directions/driving/-0.12070277,51.514156;-0.12360937,51.507996?key=<Your_API_Access_Token>&steps=true&alternatives=true&geometries=polyline&overview=full
    // baseURL: "https://us1.locationiq.com/v1/"
    baseURL: " https://us1.locationiq.com/v1/directions/driving/"
});

export default api;