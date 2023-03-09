import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "./utils/api";
import Card from "./Card";

function Deck() {
    const params = useParams();
    const [deck, setDeck] = useState({});

    const deleteHandler = () => {
        if (window.confirm("Delete this deck?")) {
          const abortController = new AbortController();
    
          deleteDeck(deck.id, abortController.signal);
        }
      };

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const response = await readDeck(params.deckId, abortController.signal)
            setDeck(response);
        }

        loadDeck();
    }, [])

    if(Object.keys(deck).length === 0) return <p>Loading...</p>

    return <div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {deck.name}
        </li>
      </ol>
    </nav>
    <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} className="m-1 btn btn-secondary">Edit</Link>
        <Link to={`/decks/${deck.id}/study`} className="m-1 btn btn-primary">Study</Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="m-1 btn btn-primary">Add Cards</Link>
        <button onClick={deleteHandler} className="btn btn-danger">Delete</button>
    </div>
    <div>
        <h2>Cards</h2>
        {deck.cards.map((card, index) => <Card key={index} card={card}/>)}
    </div>
  </div>
}

export default Deck;