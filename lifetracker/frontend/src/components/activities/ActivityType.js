import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putUser } from '../../actions/activities'
import '../css/user.css'



export class ActivityType extends Component {


    static propTypes = {
        user: PropTypes.object.isRequired,
        activity_type: PropTypes.object.isRequired,
        putUser: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(JSON.stringify(this.props.user)),
            updated_activity_type: JSON.parse(JSON.stringify(this.props.activity_type)),
            id: Math.floor(Math.random() * (100000 - 0 + 1)) + 0
        }
    }


    onChange = e => {


        document.getElementById('submit' + this.props.activity_type.color).style.visibility = 'visible';

        this.setState(prevState => {
            let updated_activity_type = Object.assign({}, prevState.updated_activity_type);
            updated_activity_type.color = e.target.value;

            // Returning to no submit if returned to original value  
            if (updated_activity_type.color == this.props.activity_type.color) {
                document.getElementById('submit' + this.props.activity_type.color).style.visibility = 'hidden';
            }

            return { updated_activity_type };
        });

    }

    onSubmit = e => {
        e.preventDefault();

        delete this.state.user.activityTypes; // Get rid of add-on object I use to move around array easier
        this.state.user.activity_types[this.state.updated_activity_type.value] = { "name": this.state.updated_activity_type.name, "color": this.state.updated_activity_type.color };
        document.getElementById('submit' + this.props.activity_type.color).style.visibility = 'hidden';
        this.props.putUser(this.state.user);
        console.log('SUBMITTED');
    }

    static getDerivedStateFromProps(props, state) {
        // In case the very first element is updated by the parent after the constructor
        if (props.activity_type.value != 'default' && state.updated_activity_type.value == 'default') {
            return {
                updated_activity_type: JSON.parse(JSON.stringify(props.activity_type)),
                user: JSON.parse(JSON.stringify(props.user))
            };
        }
        return { updated_activity_type: state.updated_activity_type };
    }



    render() {

        if (this.state.updated_activity_type.value == 'default') return null;
        return (
            <div style={{ paddingBottom: "10px" }}>
                <table >
                    <tbody>
                        <tr>
                            <td style={{ width: '200px' }}>{this.props.activity_type.name}</td>
                            <td>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.updated_activity_type.color}
                                    style={{ color: '#FFFFFF', backgroundColor: this.state.updated_activity_type.color, size: "10" }}
                                    onChange={this.onChange}
                                />
                            </td>
                            <td>
                                <div id={'submit' + this.props.activity_type.color} className="form-group mb-2" style={{ position: "relative", top: "4px", paddingLeft: '5px', visibility: 'hidden' }} >
                                    <button type="submit" onClick={this.onSubmit} className="btn btn-primary tab-button" style={{ backgroundColor: '#DCDCDC' }}>
                                        ✓
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(null, { putUser })(ActivityType);