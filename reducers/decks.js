import omit from "lodash.omit";
import {
  GET_DECKS,
  CREATE_DECK,
  DELETE_DECK,
  ADD_CARD,
  REMOVE_CARD
} from "./../actions/constants";

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title: title,
          questions: []
        }
      };
    case DELETE_DECK:
      const { title: deckTitle } = action;
      const newState = omit(state, deckTitle);
      return newState;
    case ADD_CARD:
      const { card } = action;
      const { question, answer, name } = card;
      return {
        ...state,
        [name]: {
          ...state[name],
          questions: state[name].questions.concat([{ question, answer }])
        }
      };
    case REMOVE_CARD:
      const { deckQuestion } = action;
      const { question: qst, name: nm } = deckQuestion;
      return {
        ...state,
        [nm]: {
          ...state[nm],
          questions: state[nm].questions.filter(q => q.question !== qst)
        }
      };
    default:
      return state;
  }
};

export default decks;
