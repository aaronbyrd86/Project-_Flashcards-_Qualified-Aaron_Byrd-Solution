import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import CreateDeck from "../CreateDeck";
import { listDecks } from "../utils/api";
import DeckOverview from "../DeckOverview";
import StudyDeck from "../Study/StudyDeck";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";

function Layout() {
  const history = useHistory();
  const params = useParams();
  const [decks, setDecks] = useState([]);
 

  const createDeckHandler = () => {
    history.push("/decks/new");
  };

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    }

    loadDecks();
  }, [])

  if(decks.length != 0 && params.deckId) {
    console.log(params.deckId)
    if(!decks.find(deck => deck.id === params.deckId))
      return <NotFound />
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Switch>
          <Route exact path="/">
            <button onClick={createDeckHandler}>Create Deck</button>
            {decks ? decks.map((deck, index) => {
              return <DeckOverview key={index} deck={deck}/>
            })
            :<NotFound />}
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck decks={decks}/>
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
