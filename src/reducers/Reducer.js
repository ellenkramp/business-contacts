import { ACTIONS } from '../actions/Actions';

const initialState = {
    currentLocation: {},
    businesses: []
}

const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case ACTIONS.FETCH_BUSINESSES:
            return Object.assign({}, state, {
                businesses:action.payload
            });
        case ACTIONS.LOCATE_USER:
            return Object.assign({}, state, {
                currentLocation:action.payload
            });
        default:
            return state;
    }
}

export default Reducer;