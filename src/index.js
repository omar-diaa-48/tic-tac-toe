import React from 'react'
import ReactDOM from 'react-dom'

const rowStyle = {
	display: 'flex',
}

const squareStyle = {
	width: '60px',
	height: '60px',
	backgroundColor: '#ddd',
	margin: '4px',
	display: 'flex',

	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '20px',
	color: 'white',

	cursor: 'pointer'
}

const boardStyle = {
	backgroundColor: '#eee',
	width: '208px',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex',
	flexDirection: 'column',
	border: '3px #eee solid',
}

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
}

const instructionsStyle = {
	marginTop: '5px',
	marginBottom: '5px',
	fontWeight: 'bold',
	fontSize: '16px',
}

const buttonStyle = {
	marginTop: '15px',
	marginBottom: '16px',
	width: '80px',
	height: '40px',
	backgroundColor: '#8acaca',
	color: 'white',
	fontSize: '16px',
}

function Square({ index, value, handleClick }) {
	return (
		<div onClick={() => handleClick(index)} className="square" style={squareStyle}>{value}</div>
	)
}

function Board() {
	const [squares, setSquares] = React.useState(Array(9).fill(null))
	const [currentWinner, setCurrentWinner] = React.useState("None")
	const [currentPlayer, setCurrentPlayer] = React.useState("X");

	const calculateWinner = (squares) => {
		const winningPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		for (let i = 0; i < winningPatterns.length; i++) {
			const [a, b, c] = winningPatterns[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i]) {
			return
		}

		squares[i] = currentPlayer
		setSquares(() => [...squares])
		setCurrentPlayer((prevValue) => prevValue === "X" ? "O" : "X")
	}

	const resetGame = () => {
		setCurrentPlayer("X")
		setCurrentWinner("None")
		setSquares(Array(9).fill(null))
	}

	React.useEffect(() => {
		const winner = calculateWinner(squares)

		if (winner) {
			setCurrentWinner(winner)
		}
	}, [squares])

	return (
		<div style={containerStyle} className="gameBoard">
			<div id="statusArea" className="status" style={instructionsStyle}>
				Next player: <span>{currentPlayer}</span>
			</div>
			{
				currentWinner !== "None" && (
					<div id="winnerArea" className="winner" style={instructionsStyle}>
						Winner:
						<span>{currentWinner}</span>
					</div>
				)
			}
			<button onClick={() => resetGame()} style={buttonStyle}>Reset</button>
			<div style={boardStyle}>
				<div className="board-row" style={rowStyle}>
					{[0, 1, 2].map((i) => (
						<Square key={i} index={i} value={squares[i]} handleClick={handleClick} />
					))}
				</div>
				<div className="board-row" style={rowStyle}>
					{[3, 4, 5].map((i) => (
						<Square key={i} index={i} value={squares[i]} handleClick={handleClick} />
					))}
				</div>
				<div className="board-row" style={rowStyle}>
					{[6, 7, 8].map((i) => (
						<Square key={i} index={i} value={squares[i]} handleClick={handleClick} />
					))}
				</div>
			</div>
		</div>
	)
}

function Game() {
	return (
		<div className="game">
			<div className="game-board">
				<Board />
			</div>
		</div>
	)
}

ReactDOM.render(<Game />, document.getElementById('root'))