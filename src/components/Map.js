import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DisplayName from './LocationName';

export const gmKey = 'AIzaSyDDFmtGsZQUblhJEuXo9YNrN6pFO_tfiW0';

class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            closed:""};
    }
    render() {
        const defaultProps = {
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 9
        };
//creates markers on the map for the localBusinesses (within 20 miles of user)
        const markers = this.props.locations.map((location, index) => {
            return (
                <div
                    style={{width: '10px', height: '10px', backgroundColor: 'blue'}}
                    lat={location.attributes.latitude}
                    lng={location.attributes.longitude}
//when user mouses over any point, the name of the business shows up beneath map
                    onMouseOver={(event) => this.setState(
                        {name:location.attributes.business_name,
                        closed:location.attributes.closed})}
                    key={index}
                />

            );
        })

        return (
            
            <div style={{height: '400px', width: '400px' }}>
            
                <h1>Businesses Near You</h1>
                <GoogleMapReact 
                    bootstrapURLKeys={{key: gmKey}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    >
                  {markers}

                </GoogleMapReact>
                <DisplayName name={this.state.name} />
            </div>
        );
    }
}


export default MapContainer;