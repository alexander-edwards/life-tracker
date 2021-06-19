import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'
import { putUser } from '../../actions/activities'


export class DailyBinActivityTypes extends Component {


    static propTypes = {
        user: PropTypes.object.isRequired,
        putUser: PropTypes.func.isRequired,
    }

    static state = {
        bin_activities_done: []
    }

    render() {
        if (this.props.user.activityTypes.length == 1) return <div></div>;
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Group controlId="formBasicCheckbox">

                            {
                                this.props.user.bin_activity_types.map(activity => (
                                    <Form.Check type="checkbox" onChange={this.onChange} label={activity.activity} />

                                ))}

                        </Form.Group>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default DailyBinActivityTypes
