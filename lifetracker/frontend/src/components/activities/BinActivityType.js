import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'
import { putUser } from '../../actions/activities'

export class BinActivityType extends Component {


    static propTypes = {
        user: PropTypes.object.isRequired,
        putUser: PropTypes.func.isRequired,
    }

    static state = {
        activity: ''
    }

    onSubmit = e => {
        e.preventDefault();

        var user_obj = this.props.user;
        user_obj.bin_activity_types.push({ "activity": this.state.activity })
        this.props.putUser(user_obj);
        console.log('SUBMITTED');
    }

    onChange = e => {
        this.setState({ activity: e.target.value })

    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Activity</Form.Label>
                        <Form.Control
                            type="activity"
                            placeholder="Enter activity name, i.e. 'Slept 8 hours'"
                            onChange={this.onChange} />
                        <Form.Text className="text-muted">
                            Best to use a past tense verb.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(null, { putUser })(BinActivityType);
