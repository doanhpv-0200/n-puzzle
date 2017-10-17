import React from 'react';
import Puzzle from 'components/Puzzle';

import './app.scss';

export default class App extends React.Component {
    render () {
        return (
            <div className="app__content">
                <div className="app__header">
                </div>
                <div className="app__body">
                    <Puzzle />
                </div>
            </div>
        )
    }
}
