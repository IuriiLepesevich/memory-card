import "../styles/MemoryGame.css";
import { useEffect, useState } from "react";
import Score from "./Score";
import CardBoard from "./CardBoard";
import { cardsArray, shuffleArray } from "./cardCollection";
import CardAdder from "./CardAdder";

const key = "7AoNKC3KH2nPqSS8fCD3bdDCsZUrIqfp";

export default function MemoryGame() {
  const [scoreBest, setScoreBest] = useState(0);
  const [scoreCurrent, setScoreCurrent] = useState(0);
  const [cards, setCards] = useState(shuffleArray(cardsArray));
  const [newCard, setNewCard] = useState("");

  function addNewCard() {
    if (!newCard || cards.some((card) => card.name === newCard)) return;
    try {
      fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${newCard}`,
        { mode: "cors" }
      )
        .then((response) => response.json())
        .then((response) => {
          setCards(
            cards.concat({
              name: newCard,
              imageUrl: response.data.images.original.url,
              clicked: false,
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  }

  function removeCard(name) {
    setCards(cards.filter((card) => card.name !== name));
  }

  function handleClick(e) {
    if (!e.currentTarget.id) {
      removeCard(e.currentTarget.className);
      return;
    }
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

  const fetchImages = async () => {
    setCards(
      await Promise.all(
        cards.map(async (card) => {
          try {
            await fetch(
              `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${card.name}`,
              { mode: "cors" }
            )
              .then((response) => response.json())
              .then((response) => {
                card.imageUrl = response.data.images.original.url;
              });
          } catch (err) {
            console.error(err);
          }
          return card;
        })
      )
    );
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="MemoryGame">
      <div></div>
      <div className="mainGame">
        <h1>Memory Game</h1>
        <Score current={scoreCurrent} best={scoreBest} />
        <CardBoard
          cards={cards}
          handleClick={handleClick}
          removeCard={removeCard}
        />
      </div>
      <CardAdder handleChange={setNewCard} addNewCard={addNewCard} />
    </div>
  );
}
