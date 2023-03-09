import React from "react";
import { Link, useParams } from "react-router-dom";

function StudyCardWarning() {
  const params = useParams();

    return (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">
              Not enough cards.
            </h3>
            <p className="card-text">You need at least 3 cards to study.</p>
            <Link to={`/decks/${params.deckId}/cards/new`} className="btn btn-primary">
              Add Cards
            </Link>
          </div>
        </div>
      );
}

export default StudyCardWarning;