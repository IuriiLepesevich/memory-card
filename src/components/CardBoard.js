import "../styles/CardBoard.css";
import Card from "./Card";

export default function CardBoard(props) {
  const { cards, handleClick, removeCard } = props;

  return (
    <div className="CardBoard">
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.name}
          name={card.name}
          imageUrl={card.imageUrl}
          clicked={card.clicked}
          handleClick={handleClick}
          removeCard={handleClick}
        />
      ))}
    </div>
  );
}
