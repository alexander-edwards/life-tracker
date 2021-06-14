import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getActivities, deleteActivity, getUserProfile } from '../../actions/activities'
import PropTypes from 'prop-types';


export class History extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        activities: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getActivities: PropTypes.func.isRequired,
        deleteActivity: PropTypes.func.isRequired
    }

    componentDidMount() {

        this.props.getUserProfile();
        this.props.getActivities();

    }

    render() {
        return (

            <Fragment>
                <h2>Previously Completed</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Duration (minutes)</th>
                            <th>Date</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.activities.slice(0).reverse().map(activity => (
                            <tr key={activity.id} style={{ backgroundColor: this.props.user.colorScheme ? this.props.user.colorScheme[activity.activity] : "white" }}>
                                <td>{activity.activity}</td>
                                <td>{activity.duration_mins}</td>
                                <td>{activity.begin_time ? activity.begin_time.slice(0, 10) : activity.begin_time}</td>
                                <td>

                                    <button
                                        onClick={this.props.deleteActivity.bind(this, activity.id)}
                                        className="btn btn-danger btn-sm">
                                        Delete
                                        </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>

        )
    }
}

function mapStateToProps(state) {
    var newUser = { activityTypes: [{ value: 'default', name: 'No options' }] }
    if (state.activities.user.activityTypes) newUser = state.activities.user;
    return {
        activities: state.activities.activities,
        user: newUser
    };
}


export default connect(mapStateToProps, { getActivities, deleteActivity, getUserProfile })(History);
