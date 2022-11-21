import { useState, useEffect } from 'react';
import { 
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline 
} from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks';
import { Chart } from "../Charts";
import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import "./map.css";

export function Map() {
  const [locations, setLocations] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function MapControl() {
    useMapEvents({
      click: (event) => {
        if(locations.length >= 2){
          setLocations([event.latlng]);
        } else{
          setLocations((state) => [...state , event.latlng]);
        }
      }
    })
  }

  const source = locations[0]
  const destination = locations[1]

  useEffect(() => {
    if(destination){
      setIsLoading(true);
      api.get(`${source.lat},${source.lng};${destination.lat},${destination.lng}?key=pk.a6364d20957b04aac85c76e812c5cff0&steps=true&alternatives=true&geometries=polyline&overview=full`)
        .then(({ data }) => {setIsLoading(false); setDataChart(data)})
        .catch((error) => {setIsLoading(false); console.log(error)});
    }
  }, [destination]);

  const pathOptions = { color: 'black' };

  return (
    <div className="wrapper">
      <h1>
        Escolha um ponto de partida e um destino
      </h1>

      {
        isLoading && (
          <img src="src/assets/images/Spinner.gif" alt="Loader" id="spinner" />
        )
      }

      <MapContainer
        center={[55.6516, -4.0155]}
        zoom={3}
        minZoom={2}
        maxZoom={4}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { 
          source && (
            <Marker position={[source.lat, source.lng]}>
              <Popup>
                Ponto de partida
              </Popup>
            </Marker>
          )
        }

        { 
          destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>
                Destino
              </Popup>
            </Marker>
          )
        }

        <Polyline pathOptions={pathOptions} positions={locations} />

        <MapControl />
      </MapContainer>

      <Chart />

    </div>
  )
}
