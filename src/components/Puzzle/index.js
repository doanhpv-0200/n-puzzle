import React from 'react';
import Board from '../Board';
import './puzzle.scss';

class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [1, 2, 3, 4, 5, 6, 7, 8, 0],
            size: 3,
            move: 0,
            done: false
        };
    }

    componentWillMount() {
        this.newGame(this.state.size);
    }

    newGame(size) {
        const num = size * size;
        let goal = [];
        for (let i = 1; i <= num; i++) goal.push(i);

        const board = this.shuffle(goal);
        this.setState({ size, board, goal, move: 0, done: false});
    }

    updateBoard(board) {
        if (!this.state.done) {
            let move = this.state.move;
            this.setState({ board, move: move + 1 }, () => {
                this.setState({done: this.checkDone()});
            });
        }
    }

    checkDone() {
        const board = this.state.board,
            goal = this.state.goal;

        return goal.every((value, index) => value === board[index]);
    }

    shuffle(o) {
        const temp = o.slice();
        for (let j, x, i = temp.length; i; j = Math.floor(Math.random() * i), x = temp[--i], temp[i] = temp[j], temp[j] = x);
        return temp;
    }

    render() {
        return (
            <div className='puzzle'>
                <div className="puzzle-header">
                    {this.state.done ? <h1>You WON!</h1> : ''}
                </div>
                <div className="puzzle-body">
                    {this.state && this.state.board ?
                        <Board size={this.state.size} board={this.state.board} updateBoard={this.updateBoard.bind(this)}/>
                        : null
                    }
                </div>
                <div className="puzzle-footer">
                    <div className="move">
                        Move: {this.state.move}
                    </div>
                    <span className="button" onClick={() => this.newGame(3)}>3x3</span>
                    <span className="button" onClick={() => this.newGame(4)}>4x4</span>
                    <span className="button" onClick={() => this.newGame(5)}>5x5</span>
                    <span className="button" onClick={() => this.newGame(6)}>6x6</span>
                    <span className="button" onClick={() => this.newGame(7)}>7x7</span>
                    <span className="button" onClick={() => this.newGame(8)}>8x8</span>
                    <span className="button" onClick={() => this.newGame(9)}>9x9</span>
                    <span className="button" onClick={() => this.newGame(10)}>10x10</span>
                </div>
            </div>
        );
    }
}

export default Puzzle;
