import React, { useState } from 'react';
import './GameBoard.css';

const initialGameState = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function GameBoard() {
  const [currentUser, setCurrentUser] = useState('O');
  const [gameState, setGameState] = useState(initialGameState);

  const [isGameOver, setGameOverState] = useState(false);

  const checkGameState = newGameState => {
    const isGameOver = newGameState.reduce((acc, rowState, i) => {
      const isRowFull = !rowState.includes(null);
      return isRowFull && acc;
    }, true);
    setGameOverState(isGameOver);
  };

  const handleCoordClick = coords => {
    if (gameState[coords[0]][coords[1]] !== null) {
      return;
    }
    const newRow = [...gameState[coords[0]]];
    newRow[coords[1]] = currentUser;

    const newGameState = [...gameState];
    newGameState[coords[0]] = newRow;
    setGameState(newGameState);
    checkGameState(newGameState);
    setCurrentUser(currentUser === 'O' ? 'X' : 'O');
  };

  const restartGame = () => {
    setGameOverState(false);
    setGameState(initialGameState);
  };

  return (
    <div className="game-board">
      {isGameOver ? (
        <div style={{ marginBottom: '2em' }}>
          <span style={{ fontWeight: 'bold', marginRight: '1em' }}>Game has ended</span>
          <button type="button" onClick={restartGame}>
            Restart
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '2em' }}>{`${currentUser}'s Turn`}</div>
      )}
      {gameState.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <GameTile key={j} coords={[i, j]} value={cell} handleCoordClick={handleCoordClick} />
          ))}
        </div>
      ))}
    </div>
  );
}

function GameTile({ value, coords, handleCoordClick }) {
  return (
    <div
      className="cell"
      onClick={() => {
        handleCoordClick(coords);
      }}
      style={{
        backgroundColor: '#282c34',
        color: value === 'O' ? 'rgb(242, 235, 211)' : 'rgb(84, 84, 84)'
      }}
    >
      {value ?? ''}
    </div>
  );
}

export default GameBoard;
