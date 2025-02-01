import { useEffect, useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
      clearLetterStates();
    }
  }, [guesses]);

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word =
      words[category][
        Math.floor(Math.random() * Object.keys(categories).length)
      ];

    return { word, category };
  };

  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      return;
    }

    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter,
    ]);

    setGuesses((actual) => actual - 1);
  };

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
