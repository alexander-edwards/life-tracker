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
            activitySelected: 'default'
        };
    }
    onChange = e => {
        console.log(e.target.value);
        this.setState({ activitySelected: e.target.value }, function () {
            console.log(this.state);
        });
    }

    componentDidMount() {
        this.createTable();
    }

    createTable() {
        const mystyle = {
            height: "50px",
            width: "50px",
            backgroundColor: "#555",
        }

        var table = document.createElement('table');
        for (var i = 0; i < 1; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var td1 = document.createElement('td');
                var square = document.createElement('div');
                square.style = '{mystyle}';
                var text = document.createTextNode('test');
                text.style = mystyle;
                td1.appendChild(square);
                td1.appendChild(text);
                tr.appendChild(td1);

            }
            table.appendChild(tr);
        }

        var gitPlace = document.getElementById('git test')
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


                <select
                    style={{ width: 300, height: 30 }}
                    onChange={this.onChange}
                    name='activity'
                    value={activity}>

                    {this.props.user.activityTypes.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                    })}

                </select>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Duration</th>
                            <th>Begin Time</th>
                            <th>End Times</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.activities.filter(activity => activity.activity == this.state.activitySelected).map(activity => (

                            <tr key={activity.id}>

                                <td>{activity.activity}</td>
                                <td>{activity.duration_mins}</td>
                                <td>{activity.begin_time}</td>
                                <td>{activity.end_time}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div id="git test"></div>
            </div >

        )
    }
}

function mapStateToProps(state) {

    return { activities: state.activities.activities };
}



export default connect(mapStateToProps)(GitView);

