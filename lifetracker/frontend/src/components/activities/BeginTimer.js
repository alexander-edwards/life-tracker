import React, { Component, Row } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addActivity } from '../../actions/activities';

export class BeginTimer extends Component {

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
            seconds: parseInt(props.startTimeInSeconds, 10) || 0
        };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
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
        console.log(this.state.seconds);
        this.setState({ duration_mins: this.state.seconds, end_time: current.toLocaleString() });


        // Add activity
        const { activity, duration_mins } = this.state;
        const activity_obj = {
            'activity': activity,
            'duration_mins': this.state.seconds,
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
        console.log(e.target.name);

        this.setState({ [e.target.name]: [e.target.value] });
    }


    render() {
        const { activity } = this.state;
        return (


            <div className="card card-body mt-4 mb-4">
                <h2> Track activity</h2>
                <form class="form-inline" onSubmit={this.onSubmit}>
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
                    <div>
                        Timer: {this.formatTime(this.state.seconds)}
                    </div>
                    <div className="form-group mb-2">
                        <button onClick={this.start} type="start" className="btn btn-primary">
                            Start
                        </button>
                    </div>

                    <div className="form-group mb-2">
                        <button onClick={this.end} type="end" className="btn btn-primary">
                            End
                        </button>
                    </div>
                </form>

            </div>

        )
    }
}

export default connect(null, { addActivity })(BeginTimer);