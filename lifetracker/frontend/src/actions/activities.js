import axios from 'axios';

import { GET_ACTIVITIES, DELETE_ACTIVITY, ADD_ACTIVITY, GET_USER } from './types';

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
export const deleteActivity = (id) => dispatch => {
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
    console.log('getting user profile');
    var user = {
        activityTypes: [
            { value: 'Guitar', name: 'Guitar', color: '#2A7F62' },
            { value: 'Life tracker', name: 'Life tracker', color: '#F3DE8A' },
            { value: 'Chess', name: 'Chess', color: '#EB9486' }]
    };
    var colorScheme = {}
    for (var i = 0; i < user.activityTypes.length; i++) colorScheme[user.activityTypes[i].value] = user.activityTypes[i].color;
    user.colorScheme = colorScheme;
    dispatch({
        type: GET_USER,
        payload: user
    });
}