export const ACTIONS = {
    FETCH_BUSINESSES: 'FETCH_BUSINESSES',
    LOCATE_USER: 'LOCATE_USER',
    GET_BUSINESSES_IN_RANGE: 'GET_BUSINESSES_IN_RANGE'
}
//ensure that the functions happen in proper order so we get
//the date we need to move onto the next step
export const getLocationData = () => {
    return async (dispatch, getState) => {
        await dispatch(getLocation())
        await dispatch(getBusinesses())
    }
}
// use api to determine user's lat/lon coordinates... 
// (or the coordinates of their ip address anyway)
export const getLocation = () => {
    return dispatch => {
        return fetch('http://ip-api.com/json')
            .then(res => res.json())
            .then(userLocation => {
                return dispatch({
                    type: ACTIONS.LOCATE_USER,
                    payload: userLocation
                });
            })
            .catch((err) => console.error('error:', err))
    }
}
//get all businesses from the backend api
const getBusinesses = () => {
    return (dispatch, getState) => {
        const currentLocation = getState().currentLocation;
        console.log(currentLocation);
        return fetch('http://localhost:1337')
        .then(res => res.json())
        .then(businesses => {
            //now narrow that down to just the local businesses (within 20 mi)
            const localBusinesses = getLocalBusinesses(businesses.data, currentLocation);
            return dispatch({
                type: ACTIONS.FETCH_BUSINESSES,
                payload: localBusinesses
            })
        
        })
        .catch(err => console.error('error:', err))
    }
}
//of the businesses found at the backend api (1337), which are within 20 miles of the user?
const getLocalBusinesses = (businesses, currentLocation) => {
        const lat1 = currentLocation.lat;
        const lon1 = currentLocation.lon;
        return businesses.filter((business) => {
            const lat2 = business.attributes.latitude;
            const lon2 = business.attributes.longitude;
            const distance = distanceBetweenCoordinates(lat1, lon1, lat2, lon2);
            return distance < 20;
        });
}
// use lat and long coordinates between user and businesses to calculate distance, 
// accounting for curve of earth
const distanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
    const radlat1 = Math.PI * lat1/180;
	const radlat2 = Math.PI * lat2/180;
	const theta = lon1-lon2;
    const radtheta = Math.PI * theta/180;
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
	dist = dist * 0.8684;
	return dist
}