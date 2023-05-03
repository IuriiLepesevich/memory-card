const cardsArray = [
  {
    name: "1",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "2",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "3",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "4",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "5",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "6",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "7",
    imageUrl: "",
    clicked: false,
  },
  {
    name: "8",
    imageUrl: "",
    clicked: false,
  },
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

export { cardsArray, shuffleArray };
