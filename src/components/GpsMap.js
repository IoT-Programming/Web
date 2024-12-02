import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const GpsMap = ({ lat, lon }) => {
  // 기본값 설정 (서울 중심 좌표)
  const defaultLat = 37.5665;
  const defaultLon = 126.9780;

  // lat과 lon이 null이면 기본값 사용
  const centerLat = lat ?? defaultLat;
  const centerLon = lon ?? defaultLon;

  return (
    <MapContainer center={[centerLat, centerLon]} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[centerLat, centerLon]} />
    </MapContainer>
  );
};

export default GpsMap;
