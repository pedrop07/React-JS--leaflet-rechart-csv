import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from 'react-leaflet/hooks';
import { useState, useEffect } from 'react';
import api from "../../services/api";
import Chart from "../charts";
import "./map.css";

function Map() {
  const [locations, setLocations] = useState([]);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [spinner, setSpinner] = useState(false);

  function MapControl() {
    const map = useMapEvents({
      click: (event) => {
        if(locations.length >= 2){
          setLocations([event.latlng]);
        } else{
          setLocations((value) => [...value , event.latlng]);
        }
      }
    })
    return null;
  }

  useEffect(() => {
    if(locations.length > 0){
        setSource([locations[0].lat, locations[0].lng]);
        locations.length > 1 ? setDestination([locations[1].lat, locations[1].lng]) : setDestination([]);
    }
  }, [locations]);

  useEffect(() => {
    if(destination.length != 0){
      setSpinner(true);
      api.get(`${source[0]},${source[1]};${destination[0]},${destination[1]}?key=pk.a6364d20957b04aac85c76e812c5cff0&steps=true&alternatives=true&geometries=polyline&overview=full`)
        .then(({ data }) => {setSpinner(false); setDataChart(data)})
        .catch((error) => {setSpinner(false); console.log(error)});
    }
  }, [destination]);

  const pathOptions = { color: 'black' };

  return (
    <div className="wrapper">
      Escolha um ponto de partida e um destino

      {
        spinner && (
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
          source.length > 0 && (
            <Marker position={[source[0], source[1]]}>
              <Popup>
                Ponto de partida
              </Popup>
            </Marker>
          )
        }
        
        { 
          destination.length > 0 && (
            <Marker position={[destination[0], destination[1]]}>
              <Popup>
                Destino
              </Popup>
            </Marker>
          )
        }

        <Polyline pathOptions={pathOptions} positions={locations} />

        <MapControl />
      </MapContainer>

      <Chart
        dataChart={dataChart}
      />

    </div>
  )
}

export default Map;
