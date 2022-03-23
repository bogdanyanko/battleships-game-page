import React from 'react';

const PlayerSquare = ({ insideText, rowIndex, columnIndex, playerGameGrid, shipPlacementHandler, playerPlacedShipsNumber, shipDirectionHandler, shipProjectionHandler }) => {
  const classNameHandler = () => {
    if (playerGameGrid[rowIndex][columnIndex] === '.') {
      return 'playerSquare'
    }
    else if (playerGameGrid[rowIndex][columnIndex] === 'M') {
      return 'playerSquare missSquare'
    }
    else if (playerGameGrid[rowIndex][columnIndex] === 'X') {
      return 'playerSquare hitSquare'
    }
    else {
      return 'playerSquare takenSquare'
    } 
  }
  
  return (
    <div className={classNameHandler()} onClick={(playerPlacedShipsNumber === 5)? () => {} : () => shipPlacementHandler(rowIndex, columnIndex)} onContextMenu={shipDirectionHandler} onMouseOver={() => shipProjectionHandler(rowIndex, columnIndex)}></div>
  );
};

export default PlayerSquare;