import React from 'react'

export default function Dashboard(activityInstances) {
    console.log(activityInstances); 
    return (
        <div>
            <h1>Previously Completed</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Activity</th>
                    <th>Begin Time</th>
                    <th>End time</th>
                    <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    activityInstances.map(activityInstance =>(

                            <tr key={activityInstance.id}>
                                <td>activityInstance.activity</td>
                                <td>activityInstance.begin_time</td>
                                <td>activityInstance.end_time</td>
                                <td>activityInstance.duration</td>
                            </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    )
}

