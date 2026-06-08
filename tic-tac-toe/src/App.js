import React, { useState, useContext } from "react";
import "./App.css";
import { ThemeContext } from "./ThemeContext";


export default function App() {  
 
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function calculateWinner(board) {
    const patterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let pattern of patterns) {
      const [a, b, c] = pattern;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          line: pattern
        };
      }
    }

    return null;
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const result = calculateWinner(board);
  const winner = result?.winner;
  const winningLine = result?.line || [];

  const status = winner
    ? `Winner: ${winner}`
    : board.includes(null)
    ? `Next Player: ${isXNext ? "X" : "O"}`
    : "Draw";

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1>Tic Tac Toe </h1>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${winningLine.includes(index) ? "win" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="status">{status}</p>

      <button className="restart" onClick={restart}>
        Restart
      </button>{" "}
      <button  onClick={toggleTheme} className="restart">
  Switch to {darkMode ? "Light" : "Dark"} Mode
</button>
    </div>
  );
}