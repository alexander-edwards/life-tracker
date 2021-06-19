import { DELETE_ACTIVITY, GET_ACTIVITIES, ADD_ACTIVITY, GET_USER, PUT_USER, GET_DAYS, PUT_DAY } from '../actions/types';

const initialState = {
    activities: [],
    user: {},
    days: []
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
                activities: state.activities.filter(activity => activity.id !== action.payload)
            }
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case PUT_USER:
            return {
                ...state,
                user: action.payload
            }
        case GET_DAYS:
            return {
                ...state,
                days: action.payload
            }
        case PUT_DAY:
            return {
                ...state,
                day: action.payload
            }
        default:
            return state;
    }
}