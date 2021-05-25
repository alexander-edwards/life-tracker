import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addActivity } from '../../actions/activities'

export class AddActivity extends Component {

    state = {
        activity: '',
        begin_time: '',
        end_time: '',
        duration_mins: ''
    }

    static propTypes = {
        addActivity: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: [e.target.value] });

    onSubmit = e => {
        e.preventDefault();
        const { activity, duration_mins } = this.state;
        const activity_obj = { 'activity': activity[0], 'duration_mins': duration_mins[0] };
        this.props.addActivity(activity_obj);
    }

    render() {
        const { activity, duration_mins } = this.state;
        return (

            <div className="card card-body mt-4 mb-4">
                <h2> Completed activity</h2>
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

export default connect(null, { addActivity })(AddActivity);