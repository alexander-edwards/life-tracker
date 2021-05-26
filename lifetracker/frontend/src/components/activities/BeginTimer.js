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
            begin_time_obj: '',
            end_time_obj: '',
            interval: '',
            seconds: parseInt(props.startTimeInSeconds, 10) || 0,
        };
    }


    tick() {
        var current = new Date();
        var secsElapsed = Math.floor((current - this.state.begin_time_obj) / 1000);
        console.log(secsElapsed);
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
        const { activity, duration_mins } = this.state;
        const activity_obj = {
            'activity': activity,
            'duration_mins': Math.floor(this.state.seconds / 60),
            "end_time": current.toISOString().slice(0, 19).replace('T', ' '),
            "begin_time": this.state.begin_time
        };
        console.log(activity_obj);
        this.props.addActivity(activity_obj);


        // Reset parameters
        this.setState({ seconds: 0, activity: '' });
        document.getElementById("begin-form").reset();
        clearInterval(this.interval);
    }


    onChange = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: [e.target.value] }, function () {
            console.log(this.state);
        });
    }

    render() {

        const { activity } = this.state;
        const spanStyle = { padding: "20px", paddingTop: "20px" };
        console.log('color scheme', this.props.user.colorScheme)
        return (


            <div className="card card-body mt-4 mb-4" >
                <h2> Track activity</h2>
                <form id='begin-form' className="form-inline" onSubmit={this.onSubmit}>

                    <span >

                        <select
                            style={{ width: 300, height: 30 }}
                            onChange={this.onChange}
                            name='activity'
                            value={activity}>
                            <option select="selected">
                                Select Option
                        </option>

                            {this.props.user.activityTypes.map((e, key) => {
                                return <option key={key} value={e.value} style={{ backgroundColor: this.props.user.colorScheme[e.value] ? this.props.user.colorScheme[e.value] : 'red' }}>{e.name}</option>;
                            })}

                        </select>
                    </span>

                    <span style={spanStyle} >
                        Timer: {this.formatTime(this.state.seconds)}
                    </span>

                    <span style={spanStyle}>
                        <button onClick={this.start} type="start" className="btn btn-primary" >
                            Start
                        </button>
                    </span>

                    <span style={spanStyle}>
                        <button onClick={this.end} type="end" className="btn btn-primary">
                            End
                        </button>
                    </span>


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