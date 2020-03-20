import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        }
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

    tick = () => {
        this.setState({elapsed: new Date() - this.props.start});
    }

    render() {
        const seconds = this.state.elapsed;
        return (
            <div className="move">
                <span>Move: {this.props.move}</span>
                <span>
                    Time: {parseInt(seconds)} ms
                    <span id="result" style={{display: 'none'}}>{seconds}</span>
                </span>
            </div>
        );
    }
}

export default Timer;
