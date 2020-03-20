import React from 'react';
import Timer from './Timer';
import './footer.scss';

const Footer = ({move, newGame, start, done}) => {
    return (
        <div className="puzzle-footer">
            <div className="move">
                <span>Move: {move}</span>
                <Timer start={start} done={done} />
            </div>
            <span className="button" onClick={() => newGame(3)}>3x3</span>
            <span className="button" onClick={() => newGame(4)}>4x4</span>
            <span className="button" onClick={() => newGame(5)}>5x5</span>
            <span className="button" onClick={() => newGame(6)}>6x6</span>
            <span className="button" onClick={() => newGame(7)}>7x7</span>
            <span className="button" onClick={() => newGame(8)}>8x8</span>
            <span className="button" onClick={() => newGame(9)}>9x9</span>
            <span className="button" onClick={() => newGame(10)}>10x10</span>
        </div>
    );
}

export default Footer;
