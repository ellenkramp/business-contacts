import React, { Component } from 'react';
// import { getBusinesses } from '../actions/Actions'
// import { connect } from 'react-redux';
// import { gmKey } from './Map';


class Businesses extends Component {
    render() {
      return (
        <div className="Businesses" businesses={this.props.businesses}>
            <p>{this.props.businesses}</p>
        </div>
      );
    }
  }

export default Businesses;
