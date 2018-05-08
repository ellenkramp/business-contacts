import React, { Component } from 'react';

class DisplayName extends Component {
    render() {
        console.log(this.props.name);
        return (
            <div className="name">
                Hover over a business to view its name.
                <h1>{this.props.name.toString()}</h1>
            </div>)
    }
}
export default DisplayName;