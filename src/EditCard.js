import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "./utils/api";

function EditCard() {
  const history = useHistory();
  const params = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(params.deckId, abortController.signal);
      const responseCard = await readCard(
        params.cardId,
        abortController.signal
      );

      setDeck(response);
      setCard(responseCard);
      setFront(responseCard.front);
      setBack(responseCard.back);
    }

    loadDeck();
  }, [params]);

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    async function editCard() {
      const editedCard = {
        ...card,
        front: front,
        back: back,
      };

      await updateCard(editedCard, abortController.signal);

      history.push(`/decks/${params.deckId}`);
    }

    editCard();
  };

  if (Object.keys(deck).length === 0) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Deck {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {params.cardId}
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h2>Edit Card</h2>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            onChange={handleFrontChange}
            value={front}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            onChange={handleBackChange}
            value={back}
          ></textarea>
        </div>

        <Link to={`/decks/${params.deckId}/`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
