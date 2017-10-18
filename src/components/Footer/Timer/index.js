import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.done) {
            clearInterval(this.timer);
        }

        if (!nextProps.done && this.props.done) {
            this.timer = setInterval(this.tick, 50);
        }
    }

    tick() {
        this.setState({elapsed: new Date() - this.props.start});
    }

    render() {
        const seconds = (this.state.elapsed / 1000).toFixed(3);
        return (
            <span>
                Time: {parseInt(seconds)}s
                <span id="result" style={{display: 'none'}}>{seconds}</span>
            </span>
        );
    }
}

export default Timer;
