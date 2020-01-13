import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p>Tic-Tac-Toe</p>
      </header>
      <div style={{ padding: '2em' }}>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
