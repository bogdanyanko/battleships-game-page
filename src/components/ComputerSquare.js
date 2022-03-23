import React from 'react';

const ComputerSquare = ({  
  rowIndex, 
  columnIndex,
  computerGameGrid,
  squareShotHandler,
  playerPlacedShipsNumber,
  winnerInfo,
}) => {
  const classNameHandler = () => {
    if (computerGameGrid[rowIndex][columnIndex] === '.') {
      return 'computerSquare'
    }
    else if (computerGameGrid[rowIndex][columnIndex] === 'M') {
      return 'computerSquare missSquare'
    }
    else if (computerGameGrid[rowIndex][columnIndex] === 'X') {
      return 'computerSquare hitSquare'
    }
    else {
      return 'computerSquare'
    } 
  }

  return (
    <div className={classNameHandler()} onClick={(playerPlacedShipsNumber !== 5 || winnerInfo)? () => {} : () => squareShotHandler(rowIndex, columnIndex)}></div>
  );
};

export default ComputerSquare;