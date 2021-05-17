import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';
import AddActivity from './activities/AddActivity';
import BeginTimer from './activities/BeginTimer';
import Activities from './activities/Activities';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <div className="container">
                        <BeginTimer />
                    </div>

                    <div className="container">
                        <AddActivity />
                    </div>

                    <div className="container">
                        <Activities />
                    </div>

                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));