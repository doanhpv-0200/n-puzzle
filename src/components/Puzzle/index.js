import React from 'react';
import Board from '../Board';
import Footer from '../Footer'
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

    componentDidMount() {
        this.newGame(this.state.size);
    }

    newGame(size) {
        const num = size * size;
        let goal = [];
        for (let i = 1; i <= num; i++) goal.push(i);

        const board = this.shuffle(goal);
        this.setState({ size, board, goal, move: 0, done: false, start: Date.now()});
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
                    {this.state.done ? <h3>You won!</h3> : ''}
                </div>
                <div className="puzzle-body">
                    {this.state && this.state.board ?
                        <Board
                            size={this.state.size}
                            board={this.state.board}
                            updateBoard={this.updateBoard.bind(this)}
                        />
                        : null
                    }
                </div>
                <Footer
                    move={this.state.move}
                    start={this.state.start}
                    done={this.state.done}
                    newGame={this.newGame.bind(this)}
                />
            </div>
        );
    }
}

export default Puzzle;
