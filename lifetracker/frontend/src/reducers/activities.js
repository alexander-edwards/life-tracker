import { DELETE_ACTIVITY, GET_ACTIVITIES } from '../actions/types';

const initialState = {
    activities: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case DELETE_ACTIVITY:
            return {
                ...state,
                activity: state.activities.filter(activity => activity.id !== action.payload)
            }
        default:
            return state;
    }
}