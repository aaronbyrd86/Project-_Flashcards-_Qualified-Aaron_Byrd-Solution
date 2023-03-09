import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from "./utils/api";

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
      <CardForm deck={deck} front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} submitHandler={submitHandler}/>
    </div>
  );
}

export default AddCard;
