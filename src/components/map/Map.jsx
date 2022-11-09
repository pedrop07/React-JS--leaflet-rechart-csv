import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from 'react-leaflet/hooks';
import { useState, useEffect } from 'react';
import api from "../../services/api";
import Chart from "../charts/Chart";
import "./map.css";

function Map() {

  const [locations, setLocations] = useState([]);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);


  const [teste, setTeste] = useState([]);

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        if(locations.length >= 2){
          setLocations([e.latlng]);
        } else{
          setLocations((test) => [...test , e.latlng]);
        }
        map.flyTo(e.latlng, map.getZoom());
      }
    })
    return null
  }

  useEffect(() => {
    if(locations.length > 0){
        setSource([locations[0].lat, locations[0].lng]);
        locations.length > 1 ? setDestination([locations[1].lat, locations[1].lng]) : setDestination([]);
    }
  }, [locations]);

 
  useEffect(() => {

    api.get(`${source[0]},${source[1]};${destination[0]},${destination[1]}?key=pk.a6364d20957b04aac85c76e812c5cff0&steps=true&alternatives=true&geometries=polyline&overview=full`)
      .then(({ data }) => setTeste(data))
      .catch((error) => console.log(error));
  }, [destination]);

  const limeOptions = { color: 'black' }

  return (
    <div className="wrapper">
      <MapContainer center={[-3.721413683872664, -38.510599136352546]} zoom={3} scrollWheelZoom={true} dragging={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { 
          source.length > 0 && (
            <Marker position={[source[0], source[1]]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        }
        
        { 
          destination.length > 0 && (
            <Marker position={[destination[0], destination[1]]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        }

      <Polyline pathOptions={limeOptions} positions={locations} />

        <MyComponent />
      </MapContainer>
      

      <Chart
        info={teste}
      />

    </div>
  )
}

export default Map;
