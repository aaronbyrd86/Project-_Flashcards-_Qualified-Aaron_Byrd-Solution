import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "./utils/api";

function CreateDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);

  const cancelHandler = () => {
    history.push(`/`);
  }

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
      <DeckForm name={name} desc={desc} handleNameChange={handleNameChange} handleDescChange={handleDescChange} submitHandler={submitHandler} cancelHandler={cancelHandler}/>
    </div>
  );
}

export default CreateDeck;
