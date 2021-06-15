import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getActivities, deleteActivity, getUserProfile } from '../../actions/activities'
import ActivityType from './ActivityType';
import PropTypes from 'prop-types';
import '../css/user.css'

import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'

export class History extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        activities: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getActivities: PropTypes.func.isRequired,
        deleteActivity: PropTypes.func.isRequired
    }

    componentDidMount() {

        this.props.getUserProfile();
        this.props.getActivities();

    }

    render() {
        return (

            <Fragment>
                <div style={{ padding: "20px" }}>

                    <h3> Welcome, {this.props.user.name}</h3>
                </div>
                <Tab.Container className="user-nav-bar" id="left-tabs-example" defaultActiveKey="first">
                    <Row className="user-nav-row">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Activity Types</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <table className='activity-table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div>
                                                        {this.props.user.activityTypes.map((activity) => (
                                                            <ActivityType
                                                                user={this.props.user}
                                                                activity_type={activity}
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td style={{ verticalAlign: "top" }}>
                                                    <div style={{ paddingLeft: "100px", position: 'relative' }}>
                                                        add activity
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    asdf
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Fragment >

        )
    }
}

function mapStateToProps(state) {
    var newUser = { activityTypes: [{ value: 'default', name: 'No options' }] }
    if (state.activities.user.activityTypes) newUser = state.activities.user;
    return {
        activities: state.activities.activities,
        user: newUser
    };
}


export default connect(mapStateToProps, { getActivities, deleteActivity, getUserProfile })(History);
