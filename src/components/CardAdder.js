import "../styles/CardAdder.css";

export default function CardAdder(props) {
  const { handleChange, addNewCard } = props;
  return (
    <div className="CardAdder">
      <input
        type="text"
        placeholder="Card Name"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="button" onClick={addNewCard}>
        Add
      </button>
    </div>
  );
}
