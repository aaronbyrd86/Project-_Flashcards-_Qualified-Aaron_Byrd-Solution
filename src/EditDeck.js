import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "./utils/api";

function EditDeck() {
  const history = useHistory();
  const params = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [deck, setDeck] = useState({});

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);

  console.log(`name is ${name}`);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(params.deckId, abortController.signal);
      setDeck(response);
      setName(response.name);
      setDesc(response.description);
    }

    loadDeck();
  }, [params]);

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    async function changeDeck() {
      const deckToSend = {
        ...deck,
        name: name,
        description: desc,
      };

      const newDeck = await updateDeck(deckToSend, abortController.signal);
      setDeck(newDeck);
      console.log(newDeck);
      history.go(0);
    }

    changeDeck();
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h2>Edit Deck</h2>
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

        <Link to={`/decks/${params.deckId}`} className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
