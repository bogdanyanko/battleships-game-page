import React, { useEffect } from 'react';
import { useState } from 'react';
import PlayerGrid from './PlayerGrid';
import ComputerGrid from './ComputerGrid';
import InfoBoard from './InfoBoard';

const GameBoard = () => {
  const [playerGameGrid, setPlayerGameGrid] = useState([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
  ]);

  const [playerShipYard, setPlayerShipYard] = useState([
    {shipNumber: 0, shipLength: 5, shipName: 'Aircraft Carrier', hitNumber: 0, sunkStatus: false},
    {shipNumber: 1, shipLength: 4, shipName: 'Battleship',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 2, shipLength: 3, shipName: 'Submarine',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 3, shipLength: 3, shipName: 'Cruiser',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 4, shipLength: 2, shipName: 'Destroyer',  hitNumber: 0, sunkStatus: false}
  ]);

  const [computerGameGrid, setComputerGameGrid] = useState([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
  ]);

  const [computerShipYard, setComputerShipYard] = useState([
    {shipNumber: 0, shipLength: 5, shipName: 'Aircraft Carrier', hitNumber: 0, sunkStatus: false},
    {shipNumber: 1, shipLength: 4, shipName: 'Battleship',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 2, shipLength: 3, shipName: 'Submarine',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 3, shipLength: 3, shipName: 'Cruiser',  hitNumber: 0, sunkStatus: false},
    {shipNumber: 4, shipLength: 2, shipName: 'Destroyer',  hitNumber: 0, sunkStatus: false}
  ]);

  const [playerPlacedShipsNumber, setPlayerPlacedShipsNumber] = useState(0);

  const [winnerInfo, setWinnerInfo] = useState('');

  const computerShipPlacementHandler = () => {
    
    const computerGameGridCopy = [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
    ];

    let placedShipsNumber = 0;

    while (placedShipsNumber !== 5) {
      let shipLength = computerShipYard[placedShipsNumber].shipLength;
      let rowIndex = Math.floor(Math.random() * 10);
      let columnIndex = Math.floor(Math.random() * 10);
      let shipDirection = Math.floor(Math.random() * 10);

      if (isPlacementAllowed(computerGameGridCopy, rowIndex, columnIndex, shipLength, shipDirection)) {
        if (shipDirection%2 === 0) {
          for (let i = 0; i < shipLength; i++) {
            computerGameGridCopy[rowIndex] = [...computerGameGridCopy[rowIndex]];
            computerGameGridCopy[rowIndex][columnIndex + i] = computerShipYard[placedShipsNumber].shipNumber;
          }
        } else {
          for (let i = 0; i < shipLength; i++) {
            computerGameGridCopy[rowIndex + i] = [...computerGameGridCopy[rowIndex + i]];
            computerGameGridCopy[rowIndex + i][columnIndex] = computerShipYard[placedShipsNumber].shipNumber;
          }
        }
        placedShipsNumber++;
      }
    }
    setComputerGameGrid([...computerGameGridCopy]);
  }

  const isPlacementAllowed = (gameGrid, rowIndex, columnIndex, shipLength, shipDirection) => {
    let checkNumber = 0;

    if (shipDirection%2 === 0) {
      if ((columnIndex + shipLength) > 10) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (isSquareFree(gameGrid, rowIndex, columnIndex + i)) {
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
        if (isSquareFree(gameGrid, rowIndex + i, columnIndex)) {
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

  const isSquareFree = (gameGrid, rowIndex, columnIndex) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (gameGrid[rowIndex + i] !== undefined && gameGrid[rowIndex + i][columnIndex + j] !== undefined) {
          if (gameGrid[rowIndex + i][columnIndex + j] >= 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  useEffect(() => {
    computerShipPlacementHandler();
  }, [])

  const computerShotGenerator = () => {
    const rowIndexRandom = Math.floor(Math.random() * 10);
    const columnIndexRandom = Math.floor(Math.random() * 10);

    if (playerGameGrid[rowIndexRandom][columnIndexRandom] === 'M' || playerGameGrid[rowIndexRandom][columnIndexRandom] === 'X') {
      computerShotGenerator();
    } else {
      const playerGameGridCopy = [...playerGameGrid];
      playerGameGridCopy[rowIndexRandom] = [...playerGameGridCopy[rowIndexRandom]];
      if (playerGameGrid[rowIndexRandom][columnIndexRandom] === '.') {
        playerGameGridCopy[rowIndexRandom][columnIndexRandom] = 'M';
        setPlayerGameGrid([...playerGameGridCopy]);
      } else {
        playerShipHitHandler(playerGameGridCopy[rowIndexRandom][columnIndexRandom]);
        playerGameGridCopy[rowIndexRandom][columnIndexRandom] = 'X';
        setPlayerGameGrid([...playerGameGridCopy]);
      }
    }
  }

  const playerShipHitHandler = (shipNumber) => {
    const playerShipYardCopy = [...playerShipYard];
    const hitNumberCopy = playerShipYardCopy[shipNumber].hitNumber;
    playerShipYardCopy[shipNumber] = {...playerShipYardCopy[shipNumber], hitNumber: hitNumberCopy + 1};

    if (playerShipYardCopy[shipNumber].hitNumber === playerShipYardCopy[shipNumber].shipLength) {
      playerShipYardCopy[shipNumber] = {...playerShipYardCopy[shipNumber], sunkStatus: true};
    }
    setPlayerShipYard(playerShipYardCopy);
  }

  return (
    <div className='gameBoard'>
      <InfoBoard 
        setPlayerGameGrid={setPlayerGameGrid}
        setPlayerShipYard={setPlayerShipYard}
        setComputerGameGrid={setComputerGameGrid}
        setComputerShipYard={setComputerShipYard}
        setPlayerPlacedShipsNumber={setPlayerPlacedShipsNumber}
        winnerInfo={winnerInfo}
        setWinnerInfo={setWinnerInfo}
        computerShipPlacementHandler={computerShipPlacementHandler}
      />
      <PlayerGrid 
        playerGameGrid={playerGameGrid}
        setPlayerGameGrid={setPlayerGameGrid}
        playerShipYard={playerShipYard}
        setPlayerShipYard={setPlayerShipYard}
        playerPlacedShipsNumber={playerPlacedShipsNumber}
        setPlayerPlacedShipsNumber={setPlayerPlacedShipsNumber}
        setWinnerInfo={setWinnerInfo}
      />
      <ComputerGrid
        computerGameGrid={computerGameGrid}
        setComputerGameGrid={setComputerGameGrid}
        computerShipYard={computerShipYard}
        setComputerShipYard={setComputerShipYard}
        computerShotGenerator={computerShotGenerator}
        playerPlacedShipsNumber={playerPlacedShipsNumber}
        winnerInfo={winnerInfo}
        setWinnerInfo={setWinnerInfo}
      />
    </div>
  );
};

export default GameBoard;