import "../styles/MemoryGame.css";
import { useEffect, useState } from "react";
import Score from "./Score";
import CardBoard from "./CardBoard";
import { cardsArray, shuffleArray } from "./cardCollection";

const key = "7AoNKC3KH2nPqSS8fCD3bdDCsZUrIqfp";

export default function MemoryGame() {
  const [scoreBest, setScoreBest] = useState(0);
  const [scoreCurrent, setScoreCurrent] = useState(0);
  const [cards, setCards] = useState(shuffleArray(cardsArray));

  function removeCard(e) {
    console.log(e.currentTarget);
    // setCards(cards.filter((card) => card.name !== e.currentTarget.id));
  }

  function handleClick(e) {
    const isClickedTwice = cards.find(
      (card) => card.name === e.currentTarget.id
    ).clicked;

    if (!isClickedTwice) {
      setScoreCurrent(scoreCurrent + 1);
      setCards(
        shuffleArray(
          cards.map((card) => {
            if (card.name === e.currentTarget.id)
              return {
                name: card.name,
                imageUrl: card.imageUrl,
                clicked: true,
              };
            else return card;
          })
        )
      );
    } else {
      setScoreCurrent(0);
      setCards(
        shuffleArray(
          cards.map((card) => ({
            name: card.name,
            imageUrl: card.imageUrl,
            clicked: false,
          }))
        )
      );
    }
  }

  useEffect(() => {
    if (scoreCurrent > scoreBest) setScoreBest(scoreCurrent);
  }, [scoreCurrent]);

  const fetchImages = () => {
    const fetchArray = [];
    cards.forEach((card) => {
      fetchArray.push(
        fetch(
          `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${card.name}`,
          { mode: "cors" }
        )
      );
    });
    Promise.all(fetchArray)
      .then((result) => Promise.all(result.map((res) => res.json())))
      .then((response) => {
        setCards(
          cards.map((card, index) => ({
            name: card.name,
            imageUrl: response[index].data.images.original.url,
            clicked: card.clicked,
          }))
        );
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="MemoryGame">
      <h1>Memory Game</h1>
      <Score current={scoreCurrent} best={scoreBest} />
      <CardBoard
        cards={cards}
        handleClick={handleClick}
        removeCard={removeCard}
      />
    </div>
  );
}
