import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Circle, Popup, Polygon, FeatureGroup, ScaleControl } from 'react-leaflet';
import Config from '../../app.config';

const leafURL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${Config.mapboxAccessToken}`;

const MapComponent = (props) => {
  const mapRef = useRef();
  const groupRef = useRef();
  const [state, setState] = useState({
    latlng: {
      lat: 40.730,
      lng: -73.935,
    },
    zoom: 12,
    drawings: [],
  });

  /**
   * Loads available circles or polygons on the Map
   * @param {Object} response
   */
  const loadPolygonsOrCirclesOnMap = (response) => {
    const drawings = [];

    response.target && response.target.data.forEach((data, index) => {
      if (data.type === 'circle') {
        drawings.push((
          <Circle key={data.center.lat + data.center.lng + index} center={[data.center.lat, data.center.lng]} color="blue" radius={(data.radius * 1000)}>
            <Popup>
              <div>Target: {response.target.name}</div>
              <div>Radius: <strong>{(data.radius * 1000).toFixed(2)} m</strong></div>
            </Popup>
          </Circle>
        ));
      }

      if (data.type === 'poly') {
        drawings.push((
          <Polygon key={index} color="purple" positions={data.coordinates.map(({lat, lng}) => [lat, lng])} >
            <Popup>Target: {response.target.name}</Popup>
          </Polygon>
        ));
      }
    });

    return drawings;
  };

  /**
   * Canculate bounds for the available polygons or circles
   */
  useEffect(() => {
    if (mapRef.current && groupRef.current) {
      const mapInst = mapRef.current.leafletElement;
      const group = groupRef.current.leafletElement;
      const bounds = group.getBounds();

      if (Object.keys(bounds).length > 0) {
        mapInst.fitBounds(bounds);
      }
    }
  }, [state.drawings]);

  /**
   * Loads the target data in Map everyone time
   * we have different data for selected target
   */
  useEffect(() => {
    setState({latlng: state.latlng, drawings: loadPolygonsOrCirclesOnMap(props)});
  }, [props.target]);

  return (
    <div className="map leaflet-container">
      <Map center={state.latlng} zoom={state.zoom} className="custom-map--light" ref={mapRef}>
        <TileLayer id="mapbox/streets-v11" url={leafURL} attribution="<attribution>" />
        <FeatureGroup ref={groupRef}>
          {state.drawings}
        </FeatureGroup>
        <ScaleControl imperial={false} metric={true}/>
      </Map>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    </div>
  );
};

MapComponent.propTypes = {
  target: PropTypes.object,
};

export default MapComponent;
