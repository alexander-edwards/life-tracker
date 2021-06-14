import React, { Component } from 'react'


export class Daily extends Component {
    render() {
        return (
            <div>
                <h3 style={{ paddingLeft: "25px" }}>Today</h3>
                <table className="right-table">
                    <tr>
                        <td>
                            <div className='post-it'>
                                Add notes
                            </div>
                        </td>
                        <td>
                            <div className='post-it'>
                                This time x days ago
                               </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='post-it'>
                                Performed today
                            </div>
                        </td>
                        <td>
                            <div className='post-it'>
                                Random
                               </div>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Daily
