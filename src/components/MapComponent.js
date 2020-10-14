import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, CircleMarker, Popup, Polygon} from 'react-leaflet';
import Config from '../../app.config';

const leafURL = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${Config.mapboxAccessToken}`;

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
    };
  }

  render() {
    const drawings = [];
    let centerLatLang = {...this.state.latlng};

    this.props.target.data && this.props.target.data.forEach((data, index) => {
      if (data.type === 'circle') {
        centerLatLang = data.center ? data.center : {...this.state.latlng};
        drawings.push((
          <CircleMarker key={data.center.lat + data.center.lng + index} center={[data.center.lat, data.center.lng]} color="blue" radius={data.radius}>
            <Popup>{this.props.target.name}</Popup>
          </CircleMarker>
        ));
      }

      if (data.type === 'poly') {
        centerLatLang = data.coordinates.length ? data.coordinates[0] : {...this.state.latlng};
        drawings.push((
          <Polygon key={index} color="purple" positions={data.coordinates.map(({lat, lng}) => [lat, lng])} >
            <Popup> {this.props.target.name}</Popup>
          </Polygon>
        ));
      }
    });

    return (
      <div className="map leaflet-container">
        <Map style={{height: '60vh'}} center={centerLatLang} zoom={11} className="custom-map--light" >
          <TileLayer id="mapbox.streets" url={leafURL} attribution="<attribution>" />
          {drawings}
        </Map>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      </div>
    );
  }
}

MapComponent.propTypes = {
  target: PropTypes.object,
};

export default MapComponent;
