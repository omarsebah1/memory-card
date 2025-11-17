import GameHeader from "./components/GameHeader"
import Card from "./components/Card"
import WinMessage from "./components/winMessage"
import Confetti from 'react-confetti';
import { useGameLogic } from "./hooks/useGameLogic";
const cardsValue = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  ]
function App() {
  const {cards , score , move , isCompleted , handelClicking , initializeGame} = useGameLogic(cardsValue)

  return (
      <div className="app">
        <GameHeader key={cards.id} score={score} moves={move} onRest={initializeGame} />

        {isCompleted && (
            <>
              <WinMessage move={move} /> 
              <Confetti />
            </>
          )
        }

        <div className="cards-grid">
          {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handelClicking} />
        ))}
        </div>

        <footer class="footer">
            2025 Omar Sebah. All Rights Reserved.
        </footer>
        
      </div>
    
  )
}

export default App
