import "../styles/Card.css";

export default function Card(props) {
  const { name, imageUrl, clicked, handleClick, id, removeCard } = props;

  const newClass = `Card ${clicked ? "clicked" : ""}`;

  return (
    <div className={newClass}>
      <div
        className="imageHolder"
        id={id}
        onClick={handleClick}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <button type="button" className={id} onClick={removeCard}>
        Remove
      </button>
    </div>
  );
}
