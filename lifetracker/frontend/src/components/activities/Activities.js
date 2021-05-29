import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getActivities, deleteActivity, getUserProfile, addActivity, putUser } from '../../actions/activities'
import { GitView } from './GitView';
import { AddActivity } from './AddActivity';


import BeginTimer from './BeginTimer';


export class Activities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInitialised: false,
        }
    }

    static propTypes = {
        activities: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getActivities: PropTypes.func.isRequired,
        deleteActivity: PropTypes.func.isRequired,
        putUser: PropTypes.func.isRequired,
        addActivity: PropTypes.func.isRequired
    }

    componentDidMount() {

        this.props.getUserProfile();
        this.props.getActivities();

        this.setState({ isInitialised: true })
        console.log('set to true');

    }

    displayNotes(notes) {
        return function () {
            var notesDiv = document.getElementById(notes);
            notesDiv.style.visibility = 'visible';
        };
    }

    hideNotes(notes) {
        return function () {
            var notesDiv = document.getElementById(notes);
            notesDiv.style.visibility = 'hidden';
        };
    }

    createTable() {

        if (this.props.user.activityTypes.length == 1) return;
        var numDays = 7;
        var activitiesByDate = {}

        // Ininitalise date to activity map 
        var today = new Date();
        for (var i = numDays - 1; i > -1; i--) {
            var previously = new Date();
            previously.setDate(today.getDate() - i);
            activitiesByDate[previously.toISOString().slice(0, 10)] = []
        }

        // Get array of activities for each of the previous days
        for (var i = 0; i < this.props.activities.length; i++) {
            var dateDone = this.props.activities[i].begin_time.slice(0, 10);
            if (dateDone in activitiesByDate) activitiesByDate[dateDone].push(this.props.activities[i])
        }

        console.log('activities by date', activitiesByDate);

        // // Create the table if it is not already there
        var metaTable = document.getElementById('meta-activity-by-date-table')
        if (!metaTable) {
            metaTable = document.createElement('table');
            metaTable.setAttribute("id", "meta-activity-by-date-table");
        }

        // // Delete old rows if there
        metaTable.innerHTML = "";
        var index = 0;
        var metaTr = document.createElement('tr');
        metaTr.style.verticalAlign = 'top';

        for (var date in activitiesByDate) {
            console.log('running', date, activitiesByDate[date]);
            var dayTable = document.createElement('table');
            var dayTh = document.createElement('th');
            var dateText = document.createTextNode(date.slice(5, date.length));
            dayTh.appendChild(dateText);
            dayTable.appendChild(dayTh);
            dayTable.style.borderCollapse = 'separate';
            dayTable.style.borderSpacing = '10px';

            for (var i = 0; i < activitiesByDate[date].length; i++) {

                index += 1;

                var dayTdDiv = document.createElement('div');

                var dayTr = document.createElement('tr')

                dayTr.style.backgroundColor = this.props.user.colorScheme[activitiesByDate[date][i].activity];
                var activityType = document.createTextNode(activitiesByDate[date][i].activity);
                var duration = document.createTextNode(activitiesByDate[date][i].duration_mins);
                var dayTd1 = document.createElement('td');
                var dayTd2 = document.createElement('td');


                // <div id="parent"> <!-- This is the main container, to mouse over -->
                // <div id="popup" style="display: none">description text here</div>

                dayTdDiv.append(activityType);
                dayTd2.append(duration);

                var notesDiv = document.createElement('div')

                // Show notes
                if (activitiesByDate[date][i].notes && activitiesByDate[date][i].notes != ' ') {

                    var notesText = document.createElement('span');
                    notesText.style.fontSize = '70%';
                    notesText.appendChild(document.createTextNode(activitiesByDate[date][i].notes));
                    notesDiv.appendChild(notesText);

                    notesDiv.id = 'notes div ' + index;
                    notesDiv.style.backgroundColor = "#D3D3D3"; // Transparent
                    notesDiv.style.position = "absolute";
                    notesDiv.style.zIndex = '2';
                    notesDiv.style.visibility = 'hidden';
                    notesDiv.style.borderRadius = '0.5em';
                    notesDiv.style.padding = '1px';
                    notesDiv.style.paddingLeft = '8px';
                    notesDiv.style.paddingRight = '8px';
                    notesDiv.style.marginLeft = '50px';
                    notesDiv.style.marginTop = '-10px';

                    dayTdDiv.onmouseover = this.displayNotes(notesDiv.id);
                    dayTdDiv.onmouseout = this.hideNotes(notesDiv.id);

                    dayTdDiv.appendChild(notesDiv);
                }


                dayTd1.style.padding = '10px';
                dayTd2.style.padding = '10px';

                dayTd1.style.borderRadius = '0.5em';
                dayTd2.style.borderRadius = '0.5em';

                dayTd1.appendChild(dayTdDiv);

                dayTr.append(dayTd1);
                dayTr.append(dayTd2);

                dayTable.append(dayTr)
            }

            if (activitiesByDate[date].length == 0) {

                var dayTr = document.createElement('tr')
                dayTr.style.backgroundColor = '#D3D3D3';
                var activityType = document.createTextNode('No activity');
                var duration = document.createTextNode(0);
                var dayTd1 = document.createElement('td');
                var dayTd2 = document.createElement('td');
                dayTd1.append(activityType);
                dayTd2.append(duration);
                dayTd1.style.padding = '10px';
                dayTd2.style.padding = '10px';
                dayTr.append(dayTd1);
                dayTr.append(dayTd2);
                dayTd1.style.borderRadius = '0.5em';
                dayTd2.style.borderRadius = '0.5em';


                dayTable.append(dayTr)
            }

            var metaTd = document.createElement('td');
            metaTd.appendChild(dayTable);
            metaTr.appendChild(metaTd);
        }

        metaTable.appendChild(metaTr)
        console.log('here');
        document.getElementById('meta-activity-by-date-div').appendChild(metaTable);
        console.log('here');

    }



    render() {

        if (this.state.isInitialised) {
            this.createTable();
        }

        return (


            <Fragment>

                <table>
                    <tr style={{ 'verticalAlign': 'top' }}>
                        <td>
                            <div style={{ "width": '500px' }}>
                                <AddActivity user={this.props.user} putUser={this.props.putUser} addActivity={this.props.addActivity} />
                            </div>
                        </td>
                        <td>
                            <div style={{ "width": '250px' }}></div>
                        </td>
                        <td>
                            <div style={{ "width": '500px' }}>
                                <BeginTimer user={this.props.user} />
                            </div>
                        </td>
                    </tr>
                </table>

                <hr></hr>
                <div id="meta-activity-by-date-div"></div>


                <hr></hr>

                <GitView activities={this.props.activities} user={this.props.user} />

                <hr></hr>

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



export default connect(mapStateToProps, { getActivities, deleteActivity, getUserProfile, addActivity, putUser })(Activities);
