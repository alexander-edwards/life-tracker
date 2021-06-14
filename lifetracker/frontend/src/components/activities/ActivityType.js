import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putUser } from '../../actions/activities'
import '../css/user.css'



export class ActivityType extends Component {


    static propTypes = {
        user: PropTypes.object.isRequired,
        activityType: PropTypes.object.isRequired,
        putUser: PropTypes.func.isRequired,
    }

    state = {
        user: JSON.parse(JSON.stringify(this.props.user)),
        updatedActivityType: JSON.parse(JSON.stringify(this.props.activityType))
    }

    componentDidMount() {

        this.state.updatedActivityType = JSON.parse(JSON.stringify(this.props.activityType));
        this.state.user = JSON.parse(JSON.stringify(this.props.user));

    }

    onChange = e => {

        document.getElementById('submit' + this.props.activityType.color).style.display = 'block';

        this.setState(prevState => {
            let updatedActivityType = Object.assign({}, prevState.updatedActivityType);  // creating copy of state variable jasper
            updatedActivityType.color = e.target.value;
            if (updatedActivityType.color == this.props.activityType.color) {
                document.getElementById('submit' + this.props.activityType.color).style.display = 'none';
                console.log('here');
            }// Returning to no submit if returned to original value  
            console.log(updatedActivityType.color, this.props.activityType.color)
            return { updatedActivityType };
        });

    }

    onSubmit = e => {
        e.preventDefault();
        // Replace with updated color/name 
        for (var i = 0; i < this.state.user.activityTypes.length; i++) {
            if (this.state.updatedActivityType.value == this.state.user.activityTypes[i].value) {
                this.state.user.activityTypes[i] = this.state.updatedActivityType;
            }
        }
        document.getElementById('submit' + this.props.activityType.color).style.display = 'none';
        console.log('thisuser', this.state.user);
        const user_obj = this.state.user;
        this.props.putUser(user_obj);
    }




    render() {
        return (
            <div style={{ paddingBottom: "10px" }}>
                <table >
                    <tbody>
                        <tr>
                            <td style={{ width: '200px' }}>{this.props.activityType.name}</td>
                            <td>

                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.updatedActivityType.color}
                                    style={{ color: '#FFFFFF', backgroundColor: this.state.updatedActivityType.color, size: "10" }}
                                    onChange={this.onChange}
                                />
                            </td>
                            <td>
                                <div id={'submit' + this.props.activityType.color} className="form-group mb-2" style={{ paddingTop: "8px", paddingLeft: '5px', display: 'none' }} >
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