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

    displayNotes() {
        alert('hovering over');
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
                didActivityOnDate[previously.toISOString().slice(0, 10)] = 0;
            }

            // Get an array of whether you did the activity on a specific date
            var filteredActivities = this.props.activities.filter(activity => activity.activity == this.props.user.activityTypes[activityIndex].name)
            for (var i = 0; i < filteredActivities.length; i++) {
                var dateDone = filteredActivities[i].begin_time.slice(0, 10);
                if (dateDone in didActivityOnDate) didActivityOnDate[dateDone] += 1;
            }
            var keys = Object.keys(didActivityOnDate);
            var didActivity = keys.map(function (v) { return didActivityOnDate[v]; }).reverse();
            console.log(didActivity)

            // Create the table if it is not already there
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

                {/* <select
                    style={{ width: 300, height: 30 }}
                    onChange={this.onChange}
                    name='activity'
                    value={activity}>
                    <option select="selected">
                        Select Option
                    </option>

                    {this.props.user.activityTypes.map((e, key) => {
                        return <option key={key} value={e.value} style={{ backgroundColor: "#FF0000" }}>{e.name}</option>;
                    })}

                </select> */}

                <div id="git table place"></div>
            </div >

        )
    }
}

function mapStateToProps(state) {

    return { activities: state.activities.activities };
}



export default connect(mapStateToProps)(GitView);

