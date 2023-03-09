import React from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";

function CardForm({
  deck,
  front,
  back,
  handleFrontChange,
  handleBackChange,
  submitHandler,
}) {
  const params = useParams();
  const { path } = useRouteMatch();
  const edit = path.includes("edit");

  return (
    <form onSubmit={submitHandler}>
      {edit ? <h2>Edit Card</h2> : <h2>{deck.name}: Add Card</h2> }
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

      <Link to={`/decks/${params.deckId}/`} className="btn btn-secondary">
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
