import React from 'react';
import './cell.scss';

class Cell extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value === nextProps.value) {
            return false;
        }

        return true;
    }

    render() {
        const {value, size, clickHandler} = this.props;

        let cls = value === size*size ? 'square zero' : 'square';
        if (this.props.right) {
            cls = `${cls} right`;
        }

        return (
            <span className={cls} onClick={() => {clickHandler()}}>{value}</span>
        );
    }
}

export default Cell;
