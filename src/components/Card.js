import "../styles/Card.css";

export default function Card(props) {
  const { name, imageUrl, clicked, handleClick, id, removeCard } = props;

  const newClass = `Card ${clicked ? "clicked" : ""}`;

  return (
    <div
      className={newClass}
      id={id}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {name}
    </div>
  );
}
