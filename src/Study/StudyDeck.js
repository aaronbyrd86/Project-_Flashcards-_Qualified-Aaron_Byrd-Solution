import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import StudyCardWarning from "./StudyCardWarning";

function StudyDeck({ decks }) {
  const params = useParams();
  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(params.deckId, abortController.signal);
      setCurrentDeck(response);
    }

    loadDeck();
  }, [params]);

  if (!currentDeck.id) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {currentDeck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {currentDeck.name}</h2>
      {currentDeck.cards.length > 2 ? (
        <StudyCard currentDeck={currentDeck} />
      ) : (
        <StudyCardWarning />
      )}
    </div>
  );
}

export default StudyDeck;
