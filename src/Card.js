import React from "react";
import { deleteCard } from "./utils/api";
import { Link } from "react-router-dom";

function Card({ card }) {

  const deleteHandler = () => {
    if (window.confirm("Delete this card?")){
        deleteCard(card.id)
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-text">
          <p>{card.front}</p>
        </div>
        <div className="card-text text-right">
          <p>{card.back}</p>
          <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className=" m-1 btn btn-secondary">Edit</Link>
          <button onClick={deleteHandler} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
