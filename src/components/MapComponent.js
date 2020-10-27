import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, CircleMarker, Popup, Polygon} from 'react-leaflet';
import Config from '../../app.config';

const leafURL = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${Config.mapboxAccessToken}`;

class MapComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latlng: {
        lat: 40.730,
        lng: -73.935,
      },
    };
  }

  render() {
    const drawings = [];
    let zoom = 8;
    let centerLatLang = {...this.state.latlng};

    this.props.target && this.props.target.data.forEach((data, index) => {
      if (data.type === 'circle') {
        zoom = data.radius > 500 ? 5 : 11;
        centerLatLang = data.center ? data.center : {...this.state.latlng};
        drawings.push((
          <CircleMarker key={data.center.lat + data.center.lng + index} center={[data.center.lat, data.center.lng]} color="blue" radius={data.radius}>
            <Popup>{this.props.target.name}</Popup>
          </CircleMarker>
        ));
      }

      if (data.type === 'poly') {
        zoom = data.coordinates.length > 400 ? 5 : 11;
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
        <Map center={centerLatLang} zoom={zoom} className="custom-map--light" >
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
