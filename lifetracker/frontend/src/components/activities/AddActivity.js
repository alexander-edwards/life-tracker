import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addActivity, putUser, getUser, parseUser } from '../../actions/activities'
import { getColors, formatTime } from '../../utils/utils'

export class AddActivity extends Component {

    state = {
        activity: '',
        begin_time: '',
        end_time: '',
        duration_mins: '',
    }

    static propTypes = {
        addActivity: PropTypes.func.isRequired,
        putUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }


    onChange = e => this.setState({ [e.target.name]: [e.target.value] });

    onSubmit = e => {

        e.preventDefault();

        const { activity, duration_mins } = this.state;

        var current = new Date();
        console.log('current time', current);
        console.log(current.toLocaleString());
        const activity_obj = {
            'activity': activity[0],
            'duration_mins': duration_mins[0],
            'begin_time': formatTime(current),
        };

        console.log('avtivity is', activity_obj);
        this.props.addActivity(activity_obj);

        const user_obj = this.props.user;

        // If it is a new activity
        if (!(activity[0] in this.props.user.colorScheme)) {
            var newActivity = { "name": activity[0], color: "white" };
            var colors = getColors()
            for (var i = 0; i < colors.length; i++) {
                if (!(colors[i] in this.props.user.colorToActivity)) {
                    newActivity.color = colors[i];
                    break;
                }
            }
            user_obj.activity_types[activity[0]] = newActivity;
            user_obj.activityTypes.push(newActivity);

            this.props.putUser(user_obj);
            this.setState({
                user: parseUser(user_obj)
            });
        }

    }

    render() {
        const { activity, duration_mins } = this.state;
        return (

            <div className="mt-4 mb-4">
                <h4> Log activity</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-2">
                        <label>Activity</label>
                        <input
                            className="form-control"
                            type="text"
                            name="activity"
                            onChange={this.onChange}
                            value={activity}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Duration</label>
                        <input
                            className="form-control"
                            type="text"
                            name="duration_mins"
                            onChange={this.onChange}
                            value={duration_mins} />
                    </div>

                    <div className="form-group mb-2">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        )
    }
}



function mapStateToProps(state) {

    return { user: state.activities.user };
}




export default connect(null, { addActivity, putUser })(AddActivity);