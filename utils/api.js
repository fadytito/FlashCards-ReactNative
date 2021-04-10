import { AsyncStorage } from "react-native";

export const FLASH_CARDS_KEY = "FFLASH_CARDS_KEY";

function initStore() {
  let decks = {};
  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
  return decks;
}

function getStore(data) {
  return data === null ? initStore() : data;
}

export function _getDecks() {
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then(getStore);
}

export function _saveDeck(title) {
  return AsyncStorage.mergeItem(
    FLASH_CARDS_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}

export function _deleteDeck(title) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then((res) => {
    const data = JSON.parse(res);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(data));
  });
}

export function _addCard({ question, answer, name }) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then((results) => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {
        ...decks[name],
        questions: decks[name].questions.concat([{ question, answer }]),
      },
    };
    AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(decks));
  });
}
