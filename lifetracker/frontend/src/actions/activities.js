import axios from 'axios';

import { GET_ACTIVITIES, DELETE_ACTIVITY } from './types';

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
    console.log("Deleting activity");
    axios.delete(`/api/activity-instances/${id}/`)
        .then(res => {
            console.log('Delete activity');
            dispatch({
                type: DELETE_ACTIVITY,
                payload: id
            });
        })
        .catch(err => console.log(err));
}