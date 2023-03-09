import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "./utils/api";
import CardForm from "./CardForm";

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
      <CardForm deck={deck} front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} submitHandler={submitHandler}/>
    </div>
  );
}

export default EditCard;
