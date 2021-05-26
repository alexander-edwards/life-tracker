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

    createTable() {

        console.log('working with', this.props.activities);

        var numDays = 30;
        var didActivityOnDate = {}

        var today = new Date();
        for (var i = 0; i < numDays; i++) {
            var previously = new Date();
            previously.setDate(today.getDate() - i);
            didActivityOnDate[previously.toISOString().slice(0, 10)] = 0;
        }

        // Get an array of whether you did the activity on a specific date
        var filteredActivities = this.props.activities.filter(activity => activity.activity == this.state.activitySelected)
        for (var i = 0; i < filteredActivities.length; i++) {
            var dateDone = filteredActivities[i].begin_time.slice(0, 10);
            if (dateDone in didActivityOnDate) didActivityOnDate[dateDone] += 1;
        }
        var keys = Object.keys(didActivityOnDate);
        var didActivity = keys.map(function (v) { return didActivityOnDate[v]; }).reverse();
        console.log(didActivity)

        // Create the table if it is not already there
        var table = document.getElementById('git table')
        if (!table) {
            table = document.createElement('table');
            table.setAttribute("id", "git table");
        }

        // Delete old rows if there
        table.innerHTML = "";

        // Get the appropriate color
        var completedColor = "green";
        for (var i = 0; i < this.props.user.activityTypes.length; i++) {
            console.log(this.props.user.activityTypes[i].name, this.state.activitySelected)
            if (this.props.user.activityTypes[i].name == this.state.activitySelected) completedColor = this.props.user.activityTypes[i].color
        }

        console.log(this.props.user.activityTypes);

        for (var i = 0; i < 1; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < numDays; j++) {
                var td1 = document.createElement('td');
                var border = document.createElement('div');
                border.style.padding = '10px';
                var square = document.createElement('div');
                square.style.backgroundColor = (didActivity[j] > 0) ? completedColor : "#DCDCDC";
                square.style.width = '10px';
                square.style.height = '10px';
                td1.appendChild(border);
                border.appendChild(square);
                tr.appendChild(td1);

            }
            table.appendChild(tr);
        }

        var gitPlace = document.getElementById('git table label place')
        var tableLabel = document.createTextNode('In the past ' + numDays + ' days:')
        gitPlace.appendChild(tableLabel);
        var gitPlace = document.getElementById('git table place')
        gitPlace.appendChild(table);


    }


    render() {
        const mystyle = {
            height: "50px",
            width: "50px",
            backgroundColor: "#555",
        }

        console.log(this.props.activities)
        const { activity } = this.state;
        const spanStyle = { padding: "20px", paddingTop: "20px" };
        return (

            <div className="card card-body mt-4 mb-4" >
                <h2> Git View</h2>
                <div id="git table label place"></div>

                <select
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

                </select>

                <div id="git table place"></div>
            </div >

        )
    }
}

function mapStateToProps(state) {

    return { activities: state.activities.activities };
}



export default connect(mapStateToProps)(GitView);

