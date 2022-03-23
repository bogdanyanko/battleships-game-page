import React from 'react';

const PlayerSquare = ({ 
  rowIndex, 
  columnIndex, 
  playerGameGrid, 
  shipPlacementHandler, 
  playerPlacedShipsNumber, 
  shipDirectionHandler 
}) => {
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
    <div className={classNameHandler()} onClick={(playerPlacedShipsNumber === 5)? () => {} : () => shipPlacementHandler(rowIndex, columnIndex)} onContextMenu={shipDirectionHandler}></div>
  );
};

export default PlayerSquare;