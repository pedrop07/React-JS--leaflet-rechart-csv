import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from 'react-leaflet/hooks';
import { useState } from 'react';
import api from "../services/api";

function Map() {

  const [geoLocate, setGeoLocate] = useState({});
  const [position, setPosition] = useState(null);

  // console.log(position);

  async function handleSearch(){

    try {
      const response = await api.get(`reverse?key=pk.a6364d20957b04aac85c76e812c5cff0&lat=${position.lat}&lon=${position.lng}&format=json`);
      response.data.hasOwnProperty('erro') ? alert('Busca invalida') : setGeoLocate(response.data);
      console.log(response.data.address);

    } catch (error) {
      alert('erro ao carregar dados');
    }    
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        handleSearch();
        map.flyTo(e.latlng, map.getZoom())
      },
      // locationfound: (location) => {
      //   // console.log(location);
      //   // console.log('location found:', location)
      // },
    })
    return null
  }
 
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} dragging={false}>
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
  )
}

export default Map;
