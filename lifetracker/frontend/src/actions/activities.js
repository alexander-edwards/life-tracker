import axios from 'axios';

import { GET_ACTIVITIES, DELETE_ACTIVITY, ADD_ACTIVITY, GET_USER, PUT_USER, GET_DAYS, PUT_DAY } from './types';

// GET ACTIVITIES 
export const getActivities = () => dispatch => {
    axios.get('/api/activity-instances')
        .then(res => {
            console.log('Got activities');
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}


// DELETE ACTIVITIES 
export const deleteActivity = (id) => {
    return async (dispatch) => {
        console.log(id);
        axios.delete(`/api/activity-instances/${id}/`)
            .then(res => {
                console.log('Deleting activity');
                dispatch({
                    type: DELETE_ACTIVITY,
                    payload: id
                });
            })
            .catch(err => console.log(err));
    }
}

// ADD ACTIVITIY
export const addActivity = (activity) => dispatch => {
    axios.post('/api/activity-instances/', activity)
        .then(res => {
            console.log('Adding activity activity');
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// GET USER 
export const getUserProfile = () => dispatch => {
    var id = 1
    axios.get('/api/users/' + id)
        .then(res => {
            var user = parseUser(res.data);
            dispatch({
                type: GET_USER,
                payload: user
            });
        })
        .catch(err => console.log(err));
}

// UPDATE USER 
export const putUser = (user) => dispatch => {
    console.log('Putting user profile', user);
    var id = 1
    axios.put('/api/users/' + id + '/', user)
        .then(res => {
            dispatch({
                type: PUT_USER,
                payload: user// might need to be res.data
            });
        }).then(getUserProfile())
        .catch(err => console.log(err));
}

export const getDays = () => dispatch => {
    axios.get('/api/days')
        .then(res => {
            console.log('Got days');
            dispatch({
                type: GET_DAYS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

export const putDay = (day) => dispatch => {

    console.log('Putting day', day);
    axios.put('/api/days/' + day.date + '/', day)
        .then(res => {
            dispatch({
                type: PUT_DAY,
                payload: day// might need to be res.data
            });
        })
        .catch(err => console.log(err));
}


export function parseUser(user) {
    var colorScheme = {};
    var activityTypes = []
    var colorToActivity = {}

    for (var activity in user.activity_types) {
        colorScheme[user.activity_types[activity].name] = user.activity_types[activity].color;
        colorToActivity[user.activity_types[activity].color] = user.activity_types[activity].name; // inverse of colorScheme
        activityTypes.push({ value: activity, name: activity, color: user.activity_types[activity].color })
    };

    user.colorToActivity = colorToActivity;
    user.colorScheme = colorScheme;
    user.activityTypes = activityTypes;

    return user;
}

