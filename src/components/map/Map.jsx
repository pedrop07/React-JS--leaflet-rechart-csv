import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from 'react-leaflet/hooks';
import { useState, useEffect } from 'react';
import api from "../../services/api";
import Chart from "../charts/Chart";
import "./map.css";

function Map() {

  const [locate, setLocate] = useState(null);
  const [position, setPosition] = useState({lat: 10, lng: 12});

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }
    })
    return null
  }

  useEffect(() => {
    if(position){
      api.get(`reverse?key=pk.a6364d20957b04aac85c76e812c5cff0&lat=${position.lat}&lon=${position.lng}&format=json`)
        .then(({ data }) => setLocate(data.address))
        .catch((error) => console.log(error));
    }
  }, [position]);

  return (
    <div className="wrapper">
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} dragging={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MyComponent />
      </MapContainer>
      
      { locate  &&  (
        <div className="country-info">
          <div>
            {locate.country}
          </div>
          <div>
            {locate.country_code}
          </div>
          <div>
            {locate.state}
          </div>
          <div>
            {locate.region}
          </div>
          <div>
            {locate.city}
          </div>
        </div>
      ) }

      <Chart />
    </div>
  )
}

export default Map;
