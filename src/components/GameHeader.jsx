import React from 'react'

export default function GameHeader({score,moves, onRest}) {
  return (
    <div className='game-header'>
        <h1>🎮 Memory Card Game</h1>
      <div className="stats">
        <div className="stat-item">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moves}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={onRest}>New game</button>
    </div>
  )
}
