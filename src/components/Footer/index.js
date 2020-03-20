import React from 'react';
import Timer from './Timer';
import './footer.scss';

const Footer = ({move, newGame, start, done}) => {
    return (
        <div className="puzzle-footer">
            <Timer move={move} start={start} done={done} />
            <Button newGame={() => newGame(3)} size={3} />
            <Button newGame={() => newGame(4)} size={4} />
            <Button newGame={() => newGame(5)} size={5} />
            <Button newGame={() => newGame(6)} size={6} />
            <Button newGame={() => newGame(7)} size={7} />
        </div>
    );
}

const Button = ({newGame, size}) => <span className="button" onClick={newGame}>{size}x{size}</span>

export default Footer;
