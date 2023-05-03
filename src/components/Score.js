import "../styles/Score.css"

export default function Score(props) {
  const { current, best } = props;
  return (
    <div className="Score">
      <div className="current">Current score: {current}</div>
      <div className="best">Best score: {best}</div>
    </div>
  );
}
