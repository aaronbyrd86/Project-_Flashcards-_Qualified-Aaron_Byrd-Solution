import React, {useState } from "react";
import {useHistory } from "react-router-dom";


function StudyCard({ currentDeck }) {
  const defaultCardData = {
    cardObj: currentDeck.cards[0],
    currentText: currentDeck.cards[0].front,
    side: "front",
    index: 0,
  };
  const history = useHistory();
  const [currentCard, setCurrentCard] = useState(defaultCardData);

  const flipHandler = () => {
    if (currentCard.side === "front") {
      setCurrentCard({
        ...currentCard,
        currentText: currentCard.cardObj.back,
        side: "back",
      });
    } else {
      setCurrentCard({
        ...currentCard,
        currentText: currentCard.cardObj.front,
        side: "front",
      });
    }
  };

  const nextHandler = () => {
    //if im not at the end of the array go to the next index
    if (currentCard.index !== currentDeck.cards.length - 1) {
      const i = currentCard.index + 1;
      const newCardObj = currentDeck.cards[i];

      setCurrentCard({
        cardObj: newCardObj,
        currentText: newCardObj.front,
        side: "front",
        index: i,
      });
  
    }

    else {
      
      if (window.confirm("Restart cards?\nClick cancel to return to home page"))
        history.go(0)
      else
        history.push("/")
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">
          Card {currentCard.index + 1} of {currentDeck.cards.length}
        </h3>
        <p className="card-text">{currentCard.currentText}</p>
        <button onClick={flipHandler} className="btn btn-secondary">
          Flip
        </button>
        {currentCard.side === "back" || currentCard.index > 0 ? (
          <button onClick={nextHandler} className="btn btn-primary">
            Next
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default StudyCard;
