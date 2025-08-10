import { useEffect, useState } from 'react';
import Card from './Card';
import Footer from './Footer';
import './App.css';

const cardImages = [
  { src: '/img/perro.jpg', matched: false },
  { src: '/img/gato.jpg', matched: false },
  { src: '/img/perico.jpg', matched: false },
  { src: '/img/gecko.jpg', matched: false },
  { src: '/img/huron.jpg', matched: false },
  { src: '/img/conejo.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTime(0);
    setIsActive(true);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setIsActive(false);
    }
  }, [cards]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-200 to-purple-300 p-4 pt-8 pb-32'>
      <div className='text-center mb-4'>
        <h1 className='text-4xl font-bold mb-2 text-purple-800'>🧠 Juego de Memoria</h1>
        <button
          className='bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-900 transition'
          onClick={shuffleCards}
        >
          Reiniciar juego
        </button>
      </div>

      <div className='grid grid-cols-4 gap-4 justify-center items-center mx-auto max-w-2xl'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <div className='text-center mt-6 text-lg text-purple-900'>
        ⏱️ Tiempo: {time}s | 🔁 Turnos: {turns}
      </div>

      <Footer />
    </div>
  );
}

export default App;
