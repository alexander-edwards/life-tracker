import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putDay, putUser } from '../../actions/activities'
import { formatTime } from '../../utils/utils';
import { DailyBinActivityTypes } from './DailyBinActivityTypes.js'
export class Daily extends Component {


    static propTypes = {
        putDay: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }



    constructor(props) {
        super(props);
        this.state = {
            daily_notes: "",
        }
    }


    onChange = e => {

        document.getElementById('submit-notes').style.visibility = 'visible';

        this.setState(prevState => {
            let daily_notes = prevState.daily_notes;
            daily_notes = e.target.value;

            // Returning to no submit if returned to original value  
            if (daily_notes == "") {
                document.getElementById('submit-notes').style.visibility = 'hidden';
            }
            return { daily_notes };
        });

    }

    onSubmit = e => {
        e.preventDefault();

        var daily_obj = {}
        daily_obj['bin_activities_done'] = []
        daily_obj['notes'] = this.state.daily_notes
        daily_obj['date'] = new Date().toISOString().slice(0, 10)
        this.props.putDay(daily_obj);
    }



    render() {
        console.log('user object', this.props.user)
        return (
            <div>
                <h5 style={{ position: 'relative', top: '10px', paddingLeft: "25px", marginTop: '10px' }}>Today</h5>
                <table className="right-table">
                    <tr>
                        <td>
                            <div className='post-it'>
                                <table style={{ height: '100%', width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                                                    <textarea
                                                        className="form-control"
                                                        style={{ height: '100%', width: '100%', resize: 'none', border: '2px' }}
                                                        placeholder="Today I..."
                                                        name="description"
                                                        value={this.state.daily_notes}
                                                        onChange={this.onChange}
                                                    />
                                                    <div id={'submit-notes'} style={{ visibility: 'hidden' }} >
                                                        <button type="submit" onClick={this.onSubmit} className="btn btn-primary tab-button" style={{ position: 'absolute', bottom: '3px', right: '3px', backgroundColor: '#DCDCDC' }}>
                                                            ✓
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </td>

                        <td>
                            <div className='post-it'>
                                Performed today
                                <DailyBinActivityTypes user={this.props.user} putUser={this.props.putUser} />
                            </div>
                        </td>
                    </tr>
                </table>
            </div >
        )
    }
}


function mapStateToProps(state) {
    var newUser = { activityTypes: [{ value: 'default', name: 'No options' }] }
    if (state.activities.user.activityTypes) newUser = state.activities.user;
    return {
        activities: state.activities.activities,
        user: newUser,
        days: state.activities.days,
    };
}


export default connect(mapStateToProps, { putDay, putUser })(Daily);
