import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck, createCard } from "./utils/api";

function AddCard() {
  const history = useHistory();
  const params = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);


  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(params.deckId, abortController.signal);
      setDeck(response);
    }

    loadDeck();
  }, [params]);

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    async function addCard() {
      const card = {
        front: front,
        back: back,
      };

    //   const newDeck = await updateDeck(deckToSend, abortController.signal);
    //   setDeck(newDeck);
    //   console.log(newDeck);

    await createCard(deck.id, card, abortController.signal);

      history.go(0);
    }

    addCard();
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
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h2>{deck.name}: Add Card</h2>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Front side of the card"
            id="front"
            onChange={handleFrontChange}
            value={front}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            placeholder="Back side of the card"
            id="back"
            onChange={handleBackChange}
            value={back}
          ></textarea>
        </div>

        <Link to={`/decks/${params.deckId}/`} className="btn btn-secondary">Done</Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
