*This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This includes the files to be served to the front end in conjunction with the following back end (served up on separate server): https://github.com/ellenkramp/front-end-challenge

## Business Location Map interacts with 3 api's:
-backend api, where ~500 business data entries are located in json format
-ip address api used to obtain user's location, http://ip-api.com/json
-google maps api, using google-map-react library to adapt better to react

## Business Location Map Functionality
Map loads in view of user's current location (according to ip address) and generates markers on the map
based on the businesses fetched from the backend that are within 20 miles. Upon hovering over any of the markers,
the name of the (fictitious) business appears below the map.
