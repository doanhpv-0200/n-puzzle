import React from 'react';
import Cell from '../Cell';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.findClickables(this.props.board, this.props.size);
        document.body.addEventListener('keydown', (event) => {this.handleKeyPress(event)});
    }

    componentWillReceiveProps(nextProps) {
        this.findClickables(nextProps.board, nextProps.size);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', (event) => {this.handleKeyPress(event)})
    }

    shouldComponentUpdate(nextProps) {
        const curr = this.props.board.join('');
        const next = nextProps.board.join('');
        return curr !== next;
    }

    handleKeyPress(event) {
        switch (event.keyCode) {
            case 40:  // down
                if (this.state.possibleTopIdx !== null && this.state.possibleTopIdx > -1) {
                    this.cellClickHandler(this.state.possibleTopIdx)
                }

                break;
            case 38:  // up
                if (this.state.possiblBottomIdx !== null && this.state.possiblBottomIdx > -1) {
                    this.cellClickHandler(this.state.possiblBottomIdx)
                }

                break;
            case 39:  // right
                if (this.state.possibleLeftIdx !== null && this.state.possibleLeftIdx > -1) {
                    this.cellClickHandler(this.state.possibleLeftIdx)
                }

                break;
            case 37: // left
                if (this.state.possiblRightIdx !== null && this.state.possiblRightIdx > -1) {
                    this.cellClickHandler(this.state.possiblRightIdx)
                }

                break;
            default:
                break;
        }
    }

    findClickables(board, size) {
        const zeroIndex = board.indexOf(size*size);
        const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
        const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
        const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
        const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
        const possibleLeftIdx = zeroCoordinate.column > 1 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;

        this.setState({
            zero: zeroIndex,
            possibleTopIdx: possibleTopIdx,
            possiblRightIdx: possiblRightIdx,
            possiblBottomIdx: possiblBottomIdx,
            possibleLeftIdx: possibleLeftIdx
        });
    }

    getCoordFromIndex(idx, size) {
        return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
    }

    getIndexFromCoord(row, col, size) {
        return (size * (row - 1)) + col - 1;
    }

    cellClickHandler(index) {
        if (index === this.state.possibleTopIdx ||
            index === this.state.possiblRightIdx ||
            index === this.state.possiblBottomIdx ||
            index === this.state.possibleLeftIdx
        ) {
            this.updateBoard(index);
        }
    }

    updateBoard(index, direction) {
        const board = this.props.board.slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this.props.updateBoard(board);
    }

    render() {
        const size = this.props.size;
        let squares = [];

        let docWidth = document.body.clientWidth,
            docHeight = document.body.clientHeight;
        const maxWidth = parseInt(docWidth / size) - 10,
            maxHeight = parseInt((docHeight - 200) / size),
            unit = maxHeight > maxWidth ? maxWidth : maxHeight;

        this.props.board.map((val, index) => {
            squares.push(
                <Cell
                    key={index}
                    value={val}
                    size={size}
                    clickHandler={() => this.cellClickHandler(index)}
                    right={index+1 === val}
                    unit={unit}
                />
            );

            if ((index + 1) % size === 0) {
                squares.push(<br key={`br_${index}`} />)
            }
        });

        return (
            <div className='board'>
                {squares}
            </div>
        );
    }
}

export default Board;
