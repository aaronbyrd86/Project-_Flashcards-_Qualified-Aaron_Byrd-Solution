import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "./utils/api";

function DeckOverview({ deck }) {
  const history = useHistory();
  
  const deleteHandler = () => {
    if (window.confirm("Delete this deck?")) {
      const abortController = new AbortController();

      deleteDeck(deck.id, abortController.signal);
    }
  };

  const viewHandler = () => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div className="card">
      <h3 className="card-title">{deck.name}</h3>
      <h4 className="card-subtitle mb-2 text-muted">
        {deck.cards.length} cards
      </h4>
      <div className="card-body">
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/study`} className="m-1 btn btn-primary">
          Study
        </Link>
        <button onClick={viewHandler} className="m-1 btn btn-secondary">
          View
        </button>
        <button onClick={deleteHandler} className="m-1 btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckOverview;
