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


    onChange = e => this.setState({ [e.target.name]: [e.target.value] });

    onSubmit = e => {

        e.preventDefault();

        const { activity, duration_mins, notes } = this.state;

        var current = new Date();
        console.log('current time', current);
        console.log(current.toLocaleString());
        const activity_obj = {
            'activity': activity[0],
            'duration_mins': duration_mins[0],
            'begin_time': formatTime(current),
            'notes': notes[0]
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

        document.getElementById("add-activity-form").reset();

    }

    openTab(tabID) {

        // Declare all variables
        var i, tabcontent, tablinks, wasOpen;
        wasOpen = document.getElementById(tabID).style.display == "block";

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        if (!wasOpen) document.getElementById(tabID).style.display = "block";
    }


    render() {
        const { activity, duration_mins, notes } = this.state;
        return (

            <div className="mt-4 mb-4">

                <div class="tab">
                    <button className="tablinks" onClick={this.openTab.bind(this, 'add-activity')}>Log Activity</button>
                    <button className="tablinks" onClick={this.openTab.bind(this, 'timer')}>Begin Timer</button>
                </div>

                <div id='timer' class="tabcontent">
                    <BeginTimer user={this.props.user} />
                </div>

                <div id="add-activity" class="tabcontent" >

                    <form id="add-activity-form" onSubmit={this.onSubmit}>
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
                            <label>Notes</label>
                            <input
                                className="form-control"
                                type="text"
                                name="notes"
                                onChange={this.onChange}
                                value={notes} />
                        </div>

                        <div>

                            <div className="form-group mb-2 inlineRow cf">
                                <label>Duration</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="duration_mins"
                                    onChange={this.onChange}
                                    value={duration_mins} />
                            </div>
                        </div>


                        <div className="form-group mb-2">
                            <button type="submit" className="btn btn-primary">
                                Submit
                        </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}



function mapStateToProps(state) {

    return { user: state.activities.user };
}




export default connect(null, { addActivity, putUser })(AddActivity);