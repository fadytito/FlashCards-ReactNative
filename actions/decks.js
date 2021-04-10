import {
  GET_DECKS,
  CREATE_DECK,
  DELETE_DECK,
  ADD_CARD,
} from "./constants";

import {
  _getDecks,
  _saveDeck,
  _deleteDeck,
  _addCard,
} from "./../utils/api";

function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

function createDeck(title) {
  return {
    type: CREATE_DECK,
    title,
  };
}
function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return _getDecks()
      .then((data) => {
        dispatch(getDecks(JSON.parse(data)));
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function handleCreateDeck(title) {
  return (dispatch) => {
    return _saveDeck(title)
      .then(() => {
        dispatch(createDeck(title));
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function handleDeleteDeck(title) {
  return (dispatch) => {
    return _deleteDeck(title)
      .then(() => {
        dispatch(deleteDeck(title));
      })
      .catch((e) => console.error(e));
  };
}

export function handleAddCard(card) {
  return (dispatch) => {
    return _addCard(card)
      .then(() => {
        dispatch(addCard(card));
      })
      .catch((e) => console.error(e));
  };
}
