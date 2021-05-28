import React, { Component, Row } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addActivity, getUserProfile } from '../../actions/activities';

export class BeginTimer extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        getUserProfile: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            begin_time: '',
            end_time: '',
            duration_mins: '',
            notes: '',
            begin_time_obj: '',
            end_time_obj: '',
            interval: '',
            seconds: parseInt(props.startTimeInSeconds, 10) || 0,
        };
    }


    tick() {
        var current = new Date();
        var secsElapsed = Math.floor((current - this.state.begin_time_obj) / 1000);
        this.setState(state => ({
            seconds: secsElapsed
        }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    static propTypes = {
        addActivity: PropTypes.func.isRequired
    }

    start = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: [e.target.value] });
        this.setState({ activity: this.state['activity'][0] });

        // Begin timer
        var current = new Date();
        this.setState({ begin_time_obj: current, begin_time: current.toISOString().slice(0, 19).replace('T', ' ') },
            function () {
                console.log(this.state);
            });
        this.interval = setInterval(() => this.tick(), 1000);
    }

    end = e => {
        e.preventDefault();

        // End timer 
        var current = new Date();
        this.setState({ duration_mins: this.state.seconds, end_time: current.toLocaleString() });


        // Add activity
        const { activity } = this.state;
        const activity_obj = {
            'activity': activity,
            'duration_mins': Math.floor(this.state.seconds / 60),
            "end_time": current.toISOString().slice(0, 19).replace('T', ' '),
            "begin_time": this.state.begin_time,
            "notes": this.state.notes[0]
        };
        console.log('activity', activity_obj);
        this.props.addActivity(activity_obj);


        // Reset parameters
        this.setState({ seconds: 0, activity: '' });
        document.getElementById("begin-form").reset();
        clearInterval(this.interval);
    }


    onChange = e => {
        this.setState({ [e.target.name]: [e.target.value] });
    }

    render() {

        const { activity, notes } = this.state;
        const spanStyle = { padding: "20px", };
        console.log('color scheme', this.props.user.colorScheme)
        return (

            <div className="mt-4 mb-4" >
                <h4> Begin activity</h4>
                <form id='begin-form' className="form-inline" onSubmit={this.onSubmit}>


                    <div className="form-group mb-2">
                        <label>Start your activity</label>
                        <select
                            className="form-control"
                            //style={{ width: 500, height: 50 }}
                            onChange={this.onChange}
                            name='activity'
                            value={activity}>
                            <option select="selected">
                                Select Option
                            </option>

                            {Array.from(this.props.user.activityTypes).map((e, key) => {
                                return <option key={key} value={e.value} style={{ "backgroundColor": 'color:red' }}>{e.name}</option>;
                            })}

                        </select>
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

                    <div className="form-group mb-2" style={{ "paddingTop": "25px", "paddingLeft": "5px" }}>


                        <h4>Timer: {this.formatTime(this.state.seconds)}</h4>
                    </div>


                    <div className="form-group mb-2" style={{ "paddingTop": "5px", "paddingLeft": "5px" }}>


                        <button onClick={this.start} type="start" className="btn btn-primary" >
                            Start
                        </button>

                        <button onClick={this.end} type="end" className="btn btn-primary" style={{ 'marginLeft': "10px" }}>
                            End
                        </button>
                    </div>


                </form>

            </div >

        )
    }
}

function mapStateToProps(state) {
    var newUser = { activityTypes: [{ value: 'default', name: 'No options' }], colorScheme: [] }
    if (state.activities.user.activityTypes) newUser = state.activities.user;
    return { user: newUser };
}

export default connect(mapStateToProps, { addActivity, getUserProfile })(BeginTimer);