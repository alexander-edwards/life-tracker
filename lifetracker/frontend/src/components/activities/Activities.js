import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getActivities, deleteActivity } from '../../actions/activities'
export class Activities extends Component {

    static propTypes = {
        activities: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getActivities();
    }

    handleClick() {
        alert("hello world");
    }


    render() {
        return (
            <Fragment>

                <h2>Previously completed...</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Duration</th>
                            <th>Begin Time</th>
                            <th>End Time</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.activities.map(activity => (
                            <tr key={activity.id}>
                                <td>{activity.activity}</td>
                                <td>{activity.duration_mins}</td>
                                <td>{activity.begin_time}</td>
                                <td>{activity.end_time}</td>
                                <td>
                                    <button
                                        onClick={this.handleClick /* this.props.deleteActivity.bind(this, activity.id) */}
                                        className="btn btn-danger btn-sm">
                                        Delete
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Fragment >
        )
    }
}



const mapStateToProps = state => ({
    activities: state.activities.activities
})

export default connect(mapStateToProps, { getActivities, deleteActivity })(Activities);
