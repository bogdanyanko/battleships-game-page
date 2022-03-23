import React from 'react';
import { useState, useEffect } from 'react';
import PlayerSquare from './PlayerSquare';

const PlayerGrid = ({ 
  playerGameGrid, 
  setPlayerGameGrid, 
  playerShipYard, 
  playerPlacedShipsNumber, 
  setPlayerPlacedShipsNumber, 
  setWinnerInfo 
}) => {
  const [shipDirection, setShipDirection] = useState('horizontal');

  const shipDirectionHandler = (event) => {
    event.preventDefault();
    if (shipDirection === 'horizontal') {
      setShipDirection('vertical');
    } else {
      setShipDirection('horizontal');
    }
  }

  const shipPlacementHandler = (rowIndex, columnIndex) => {
    const shipLength = playerShipYard[playerPlacedShipsNumber].shipLength;
    const playerGameGridCopy = [...playerGameGrid];

    if (isPlacementAllowed(rowIndex, columnIndex, shipLength)) {
      setPlayerPlacedShipsNumber(prevState => prevState + 1);
      if (shipDirection === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          playerGameGridCopy[rowIndex] = [...playerGameGridCopy[rowIndex]];
          playerGameGridCopy[rowIndex][columnIndex + i] = playerShipYard[playerPlacedShipsNumber].shipNumber;
        }
        setPlayerGameGrid([...playerGameGridCopy]);
      } else {
        for (let i = 0; i < shipLength; i++) {
          playerGameGridCopy[rowIndex + i] = [...playerGameGridCopy[rowIndex + i]];
          playerGameGridCopy[rowIndex + i][columnIndex] = playerShipYard[playerPlacedShipsNumber].shipNumber;
        }
        setPlayerGameGrid([...playerGameGridCopy]);
      }
    } else {
      console.log('You can not place your ship here');
    }
  }

  const isPlacementAllowed = (rowIndex, columnIndex, shipLength) => {
    let checkNumber = 0;

    if (shipDirection === 'horizontal') {
      if ((columnIndex + shipLength) > 10) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (isSquareFree(rowIndex, columnIndex + i)) {
          checkNumber++;
        }
      }
      if (checkNumber === shipLength) {
        return true;
      } else {
        return false;
      }

    } else {
      if ((rowIndex + shipLength) > 10) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (isSquareFree(rowIndex + i, columnIndex)) {
          checkNumber++;
        }
      }
      if (checkNumber === shipLength) {
        return true;
      } else {
        return false;
      }
    }
  }

  const isSquareFree = (rowIndex, columnIndex) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (playerGameGrid[rowIndex + i] !== undefined && playerGameGrid[rowIndex + i][columnIndex + j] !== undefined) {
          if (playerGameGrid[rowIndex + i][columnIndex + j] >= 0) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  useEffect(() => {
    let availableShips = playerShipYard.filter(ship => ship.sunkStatus === false);
    if (availableShips.length === 0) {
      setWinnerInfo('You lost this one😥 Better luck next time!');
    }
  }, [playerShipYard]);

  return (
    <div className='playerGrid'>
      {playerGameGrid?.map((squaresArray, arrayNumber) => {
        return (
          <React.Fragment key={arrayNumber}>
            {squaresArray?.map((square, squareNumber) => {
              return (
                <PlayerSquare 
                  key={`${arrayNumber}${squareNumber}`}
                  rowIndex={arrayNumber}
                  columnIndex={squareNumber}
                  playerGameGrid={playerGameGrid}
                  shipPlacementHandler={shipPlacementHandler}
                  playerPlacedShipsNumber={playerPlacedShipsNumber}
                  shipDirectionHandler={shipDirectionHandler}
                >
                </PlayerSquare>
              )
            })}
          </React.Fragment>);
      })}
    </div>
  );
};

export default PlayerGrid;