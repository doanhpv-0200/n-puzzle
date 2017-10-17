import React from 'react';

const Cell = ({value, size, clickHandler}) => {
    const cls = value === size*size ? 'square zero' : 'square';

    return (
        <span className={cls} onClick={() => {clickHandler()}}>{value}</span>
    );
}

export default Cell;
