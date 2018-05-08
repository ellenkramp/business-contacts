import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/Map';
import {connect} from 'react-redux';
import {getLocationData} from './actions/Actions';
import Businesses from './components/Businesses';

class App extends Component {
  componentDidMount() {
    this.props.getLocationData();
  }
  render() {
    return (
      <div className="App">
        <MapContainer 
          locations={this.props.locations}
          center={{lat:this.props.userLocation.lat, 
                lng:this.props.userLocation.lon}}/>
        <Businesses>
          <p>{this.props.businesses}</p>
        </Businesses>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userLocation: state.currentLocation,
      locations: state.businesses
  };
}
const mapDispatchToProps = {
  getLocationData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);