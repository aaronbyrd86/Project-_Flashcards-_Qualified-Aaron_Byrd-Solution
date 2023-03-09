import React from "react";
import { useRouteMatch } from "react-router-dom";


function DeckForm ({ name, desc, handleNameChange, handleDescChange, submitHandler, cancelHandler}) {
    const {path} = useRouteMatch();
    const edit = path.includes("edit");

    return (
        <div>
          <form onSubmit={submitHandler}>
            {edit ? <h2>Edit Deck</h2> : <h2>Create Deck</h2>}
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
    
            {}
            <button onClick={cancelHandler} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
}

export default DeckForm;