import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "./utils/api";

function CreateDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const deck = {
      name: name,
      description: desc
    }
    const abortController = new AbortController();

    async function addDeck() {
      const newDeck = await createDeck(deck, abortController.signal);
      history.push(`/decks/${newDeck.id}`)
    }
    
    addDeck();
    
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h2>Create Deck</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Deck Name"
            id="name"
            onChange={handleNameChange}
            value={name}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            className="form-control"
            placeholder="Brief description of the deck"
            id="desc"
            onChange={handleDescChange}
            value={desc}
          ></textarea>
        </div>

        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
