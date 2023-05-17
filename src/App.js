import React from 'react';
import './style.css';
import Dice from './components/Dice';
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [clicks, setClicks] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(dice => dice.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(dice => dice.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice() {
    // old code to set all new numbers
    // setDice(allNewDice())

    if (!tenzies) {
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ? dice : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
    setClicks(prevClick => prevClick + 1)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    }))
  }

  const diceElements = dice.map(dice => <Dice key={dice.id}
    value={dice.value}
    isHeld={dice.isHeld}
    holdDice={() => holdDice(dice.id)} />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each dice to freeze it at its <br></br>current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <p>You won with {clicks} tries.</p>}
    </main>
  );
}

export default App;
