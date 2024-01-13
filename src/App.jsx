import { useEffect, useState } from "react";
import image from "./assets/img/Memory_Game_logo.png";
import christmas_Sock from "./assets/img/a_Christmas_sock.png";
import dog from "./assets/img/a_dog.png";
import sun from "./assets/img/a_realistic_picture_of_the_SUN.png";
import single_Flower from "./assets/img/a_single_Flower.png";
import single_hat from "./assets/img/a_single_hat.png";
import Kite from "./assets/img/Kite.png";
import maple_leaf from "./assets/img/a_single_strand_of_Maple_leaf.png";
import an_Apple from "./assets/img/an_Apple.png";
import Cupcake from "./assets/img/Cupcake.png";
import one_Strawberry from "./assets/img/one_Strawberry.png";
import Monkey from "./assets/img/Monkey.png";
import Pizza from "./assets/img/Pizza.png";
import Rabbit from "./assets/img/Rabbit.png";
import Scissors from "./assets/img/Scissors.png";
import Tiger from "./assets/img/Tiger.png";

import "./App.css";
import Card from "./components/Card";

function App() {
  const images = [
    {
      matched: false,
      src: christmas_Sock,
    },
    {
      matched: false,
      src: dog,
    },
    {
      matched: false,
      src: sun,
    },
    {
      matched: false,
      src: single_Flower,
    },
    {
      matched: false,
      src: single_hat,
    },
    {
      matched: false,
      src: Kite,
    },
    {
      matched: false,
      src: maple_leaf,
    },
    {
      matched: false,
      src: an_Apple,
    },
    {
      matched: false,
      src: Cupcake,
    },
    {
      matched: false,
      src: one_Strawberry,
    },
    {
      matched: false,
      src: Monkey,
    },
    {
      matched: false,
      src: Pizza,
    },
    {
      matched: false,
      src: Rabbit,
    },
    {
      matched: false,
      src: Scissors,
    },
    {
      matched: false,
      src: Tiger,
    },
  ];
  const [cards, setCards] = useState();
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState();
  const [choiceTwo, setChoiceTwo] = useState();
  const [disabled, setDisabled] = useState(false);
  const pickUniqueRandomItems = (items) => {
    const results = [];

    while (results.length < 6) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];

      if (!results.includes(randomItem)) {
        results.push(randomItem);
        items.splice(randomIndex, 1);
      }
    }

    return results;
  };
  const shuffleCards = () => {
    const pickedImgs = pickUniqueRandomItems(images);
    console.log(pickedImgs);
    const shuffledCards = [...pickedImgs, ...pickedImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    console.log(cards);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
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
        resetChoice();
      } else {
        setTimeout(() => resetChoice(), 1000);
      }
      setTurns((prevTurns) => prevTurns + 1);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards?.every((card) => card.matched === true)) {
      alert("You won!");
      if (window.confirm("Do you want to play again?")) {
        shuffleCards();
      }
    }
  }, [cards]);
  useEffect(() => {
    if (cards?.every((card) => card.matched === true)) {
      alert("You won!");
    }
    shuffleCards();
  }, []);
  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  return (
    <div className="App" >
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-layout">
        {cards?.map((card) => (
          <Card key={card.id} card={card} handleChoice={handleChoice} 
            flipped={choiceOne===card || choiceTwo===card || card.matched }
            disabled={disabled}
          />
        ))}
      </div>
      <h3>try : {turns}</h3>
    </div>
  );
}

export default App;
