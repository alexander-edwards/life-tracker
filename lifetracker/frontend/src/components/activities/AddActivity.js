import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addActivity, putUser, getUser, parseUser } from '../../actions/activities'
import { getColors, formatTime } from '../../utils/utils'
import { BeginTimer } from './BeginTimer';
import '../css/tab.css';

export class AddActivity extends Component {

    state = {
        activity: '',
        begin_time: '',
        end_time: '',
        duration_mins: '',
        notes: ''
    }

    static propTypes = {
        addActivity: PropTypes.func.isRequired,
        putUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        var date = new Date();
        var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        console.log(isoDateTime);
        this.setState({ begin_time: isoDateTime.slice(0, 16) })
    }


    onChange = e => { console.log('changed to', e.target.value); this.setState({ [e.target.name]: e.target.value }); }

    onSubmit = e => {

        e.preventDefault();

        const { activity, duration_mins, notes, begin_time } = this.state;

        const activity_obj = {
            'activity': activity,
            'duration_mins': duration_mins,
            'begin_time': begin_time,
            'notes': notes
        };
        console.log('begin time', begin_time)
        this.props.addActivity(activity_obj);

        const user_obj = this.props.user;

        // If it is a new activity
        if (!(activity[0] in this.props.user.colorScheme)) {
            var newActivity = { "name": activity, color: "white" };
            var colors = getColors()
            for (var i = 0; i < colors.length; i++) {
                if (!(colors[i] in this.props.user.colorToActivity)) {
                    newActivity.color = colors[i];
                    break;
                }
            }
            user_obj.activity_types[activity] = newActivity;
            user_obj.activityTypes.push(newActivity);

            this.props.putUser(user_obj);
            this.setState({
                user: parseUser(user_obj)
            });
        }

        document.getElementById("add-activity-form").reset();

    }


    render() {
        const { activity, duration_mins, notes, begin_time } = this.state;
        return (


            <form id="add-activity-form" onSubmit={this.onSubmit}>
                <div className="form-group mb-2">
                    <label>Activity</label>
                    <input
                        className="form-control"
                        type="text"
                        id='activity'
                        name="activity"
                        onChange={this.onChange}
                        value={activity}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Notes</label>
                    <input
                        className="form-control"
                        type="text"
                        name="notes"
                        onChange={this.onChange}
                        value={notes} />
                </div>

                <table>
                    <tr>
                        <td>
                            <div>

                                <div className="form-group mb-2 inlineRow">
                                    <label>Duration</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="duration_mins"
                                        onChange={this.onChange}
                                        value={duration_mins} />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>

                                <div className="form-group mb-2 inlineRow">
                                    <label>Begin Time</label>
                                    <input
                                        className="form-control"
                                        id='date picker'
                                        type="datetime-local"
                                        name="begin_time"
                                        onChange={this.onChange}
                                        value={begin_time}
                                    ></input>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div className="form-group mb-2" style={{ "paddingLeft": "1px" }} >
                    <button type="submit" className="btn btn-primary tab-button ">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}



function mapStateToProps(state) {

    return { user: state.activities.user };
}




export default connect(null, { addActivity, putUser })(AddActivity);