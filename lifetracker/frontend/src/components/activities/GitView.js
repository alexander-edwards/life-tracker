import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getActivities, deleteActivity, getUserProfile } from '../../actions/activities'

export class GitView extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        activities: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            activitySelected: this.props.user.activityTypes[1],
            hasPreviouslyRendered: false
        };

    }
    onChange = e => {
        console.log(e.target.value);
        this.setState({ activitySelected: e.target.value }, function () {
            this.createTable();
        });
    }

    componentDidMount() {
        this.createTable();
    }


    displayNotes(notes) {
        return function () {
            for (var i = 0; i < notes.length; i++) {
                var notesDiv = document.getElementById(notes[i]);
                notesDiv.style.visibility = 'visible';
            }

        };
    }

    hideNotes(notes) {
        return function () {
            for (var i = 0; i < notes.length; i++) {
                var notesDiv = document.getElementById(notes[i]);
                notesDiv.style.visibility = 'hidden';
            }

        };
    }


    createTable() {

        var numDays = 30;

        document.getElementById('git table place').innerHTML = "";
        document.getElementById('git table label place').innerHTML = "";

        var tableLabel = document.createTextNode('In the past ' + numDays + ' days:')
        document.getElementById('git table label place').appendChild(tableLabel);

        for (var activityIndex = 0; activityIndex < this.props.user.activityTypes.length; activityIndex++) {

            var didActivityOnDate = {}

            var today = new Date();
            for (var i = 0; i < numDays; i++) {
                var previously = new Date();
                previously.setDate(today.getDate() - i);
                didActivityOnDate[previously.toISOString().slice(0, 10)] = { "numDone": 0, "notes": [] };
            }

            // Get an array of whether you did the activity on a specific date
            var filteredActivities = this.props.activities.filter(activity => activity.activity == this.props.user.activityTypes[activityIndex].name)
            for (var i = 0; i < filteredActivities.length; i++) {
                var dateDone = filteredActivities[i].begin_time.slice(0, 10);
                if (dateDone in didActivityOnDate) {
                    didActivityOnDate[dateDone].numDone += 1 + '';
                    didActivityOnDate[dateDone].notes.push(filteredActivities[i].duration_mins);
                    if (filteredActivities[i].notes && filteredActivities[i].notes != " ") didActivityOnDate[dateDone].notes[didActivityOnDate[dateDone].notes.length - 1] += ' - ' + filteredActivities[i].notes;
                }
            }

            var keys = Object.keys(didActivityOnDate);
            var didActivity = keys.map(function (v) { return didActivityOnDate[v].numDone }).reverse();
            var notes = keys.map(function (v) { return didActivityOnDate[v].notes }).reverse();
            // Create the table if it is not already there
            console.log('notes', notes);
            var table = document.createElement('table');
            table.setAttribute("id", "git table");

            // Delete old rows if there
            table.innerHTML = "";

            // Get the appropriate color
            var completedColor = "green";
            if (this.props.user.activityTypes[activityIndex].color) completedColor = this.props.user.activityTypes[activityIndex].color;

            var tr = document.createElement('tr');

            var activityDiv = document.createElement('div');
            activityDiv.style.backgroundColor = this.props.user.activityTypes[activityIndex].color + 'aa';
            activityDiv.style.borderRadius = '0.5em';
            activityDiv.style.width = '150px';
            activityDiv.style.paddingLeft = '10px';
            var activityLabel = document.createTextNode(this.props.user.activityTypes[activityIndex].name);
            var td1 = document.createElement('td');
            activityDiv.appendChild(activityLabel);
            td1.appendChild(activityDiv);
            tr.append(td1);


            for (var j = 0; j < numDays; j++) {
                var td1 = document.createElement('td');
                var border = document.createElement('div');
                border.style.padding = '10px';
                var square = document.createElement('div');
                square.style.backgroundColor = (didActivity[j] > 0) ? completedColor : "#DCDCDC";
                square.style.width = '15px';
                square.style.height = '15px';


                var notesPlacer = document.createElement('div');
                notesPlacer.style.position = 'relative';
                var noteIds = [];

                if (notes[j] && notes[j].length > 0)
                    for (var k = 0; k < notes[j].length; k++) {
                        var notesText = document.createElement('div');
                        notesText.style.fontSize = '70%';
                        notesText.appendChild(document.createTextNode(notes[j][k]));
                        var notesDiv = document.createElement('div');
                        notesDiv.appendChild(notesText);
                        //notesText.style.maxWidth = '90px';
                        notesText.style.minWidth = '30px';
                        notesText.style.display = 'block';
                        notesText.style.width = notes[j][k].length + 'ch';

                        notesText.id = 'notes div ' + activityIndex + j + k;
                        notesText.style.backgroundColor = "#D3D3D3"; // Transparent
                        notesText.style.position = "relative";
                        notesText.style.zIndex = '2';
                        notesText.style.visibility = 'hidden';
                        notesText.style.borderRadius = '0.5em';
                        notesText.style.padding = '1px';
                        notesText.style.paddingLeft = '8px';
                        notesText.style.paddingRight = '8px';

                        noteIds.push(notesText.id);
                        notesPlacer.append(notesText);
                    }

                square.appendChild(notesPlacer);
                square.onmouseover = this.displayNotes(noteIds);
                square.onmouseout = this.hideNotes(noteIds);

                td1.appendChild(border);
                border.appendChild(square);
                tr.appendChild(td1);

            }
            table.appendChild(tr);


            document.getElementById('git table place').appendChild(table);
        }

    }


    render() {
        if (this.state.hasPreviouslyRendered) this.createTable();
        this.state.hasPreviouslyRendered = true;
        return (

            <div className="mt-4 mb-4" >
                <h4> Git View</h4>
                <div id="git table label place"></div>
                <div id="git table place"></div>
            </div >

        )
    }
}

function mapStateToProps(state) {

    return { activities: state.activities.activities };
}



export default connect(mapStateToProps)(GitView);

