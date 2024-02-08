import { getNewDeck } from './createGame';
import { checkSet, getSet, replaceCards } from '../utils/gamePlay';

// TODO: add action for changing status and status state
// TODO: add CLICK_SET action and turn state
// TODO: add TIMEOUT action
// TODO: add ADD_CARDS action and maybe board size state

const DIFFICULTY_VALUES = {
  '1': {
    speed: 30000,
    label: 'Easy',
  },
  '2': {
    speed: 20000,
    label: 'Hard',
  },
  '3': {
    speed: 10000,
    label: 'Impossible',
  },
};

function checkFeature(selectedCards, feature) {
  const featureValues = selectedCards.map(card => card[feature]);
  const uniqueValues = [...new Set(featureValues)];
  return !(uniqueValues.length === 2);
};

function checkSet(selectedCards) {
  if (!checkFeature(set, 'color')) {
    return false;
  }
  if (!checkFeature(set, 'shading')) {
    return false;
  }
  if (!checkFeature(set, 'shape')) {
    return false;
  }
  if (!checkFeature(set, 'count')) {
    return false;
  }

  return true;
  // return (checkFeature(set, 'color') && checkFeature(set, 'count') && checkFeature(set, 'shape') && checkFeature(set, 'shading'))
}

function checkForWin(deck) {
  if (deck.length === 0) {
    return true;
  }
  if (deck.length >= 21 || deck.length === 3) {
    return false;
  }
  // check if no set in remaining cards in deck
  return;
}

// display winner text only if game completed; otherwise display playersboard only
function getWinner(players) {
  let winners = [];
  // let lrgstSetCnt = 0;
  let totalSetCnt = 0;
    for (const player in players) {
      const ([id] : { setCnt, name } = player);
      const { setCnt2, name2 } = player;
      totalSetCnt += setCnt;
      let lrgstSetCnt = players[winners[0]].score;
      console.log('setCnt: ', setCnt, 'setCnt2: ', setCnt2, 'name: ', name, 'name2: ', name2, 'id: ', id, 'player: ', player, 'players: ', players, 'totalSetCnt :', totalSetCnt);
      if (setCnt > lrgstSetCnt) {
        winners = [id];
        // lrgstSetCnt = setCnt;
      } else if (setCnt === lrgstSetCnt) {
        winners.push(id);
      }
    }
    // if !(21 <= totalSetCnt && totalSetCnt >= 27) // learn how to write sysinctly
    if (totalSetCnt < 21 || totalSetCnt > 27) {
      console.error("impossible total sets count");
      return;
    }

    if (winners.length === 1) {
      const winner = winners[0];
      return `${players[winner].name} wins!`;
    } else {
      return 'Tie!';
    }
  };

  // Test
  const winnerText = getWinner({
    '01': {
      name: 'player1',
      setCnt: 2,
    },
    '02': {
      name: 'player2',
      setCnt: 20,
    },
    '03': {
      name: 'player3',
      setCnt: 2,
    },
  });
  console.log('winnerText', winnerText);


const clone = x => JSON.parse(JSON.stringify(x));

export const getInitialState = () => ({
  status: 'idle', // starting, inPlay, paused, ended
    // idle, start, pause, resume, end
  deck: getNewDeck(),
  board: [],
  cardsShowing: 12,
  // boardSize: 12 // don't need both boardSize and board b/c can just grow board when 3 more cards button clicked
  selectedCards: [],
  // set: [],
  isSet: null, // null, false, true => module state isVisible && text
  // turn: null,
  activePlayer = '', // '', 'player1' || '0', 'player2' || '01'
  // score: [0, 0],
  players: {
    '01': {
      name: 'player1',
      setCnt: 0,
    },
    '02': {
      name: 'bot',
      setCnt: 0,
    },
    // '03': {
    //   name: 'player3',
    //   setCnt: 0,
    // },
  },
  difficulty: '1',
  timeRemaining: 10,
});

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      const newState = clone(state);
      newState.status = 'started';
      return newState;
    }

    case 'QUIT': {
      const newState = clone(state);
      newState.status = 'ended';
      return newState;
    }

    // case 'GAME_OVER': {
    //   const newState = clone(state);
    //   newState.status = 'ended';
    //   return newState;
    // }

    case 'PAUSE': {
      const newState = clone(state);
      newState.status = 'pause';
      return newState;
    }

    case 'RESUME': {
      const newState = clone(state);
      newState.status = 'inPlay';
      return newState;
    }

    // case 'PLAY': {
    //   const newState = clone(state);
    //   newState.status = 'inPlay';
    //   return newState;
    // }

    case 'CLICK_SET': {
      if (state.activePlayer) {
        return state;
      }
      const newState = clone(state);
      // newState.turn = action.payload;
      newState.activePlayer = action.payload;
      return newState;
    }

    case 'SELECT_CARD': {
      const newState = clone(state);
      // const { selectedCards, turn } = newState;
      const { deck, selectedCards, activePlayer, players, status } = newState;
      const { card, player } = action.payload;
      // if (player !== turn) {
      //   return state;
      // }
      if (player !== activePlayer) {
        return state;
      }
      if (selectedCards.map(selectedCard => selectedCard.id).includes(card.id)) {
        return state;
      }
      selectedCards.push(card);
      newState.selectedCards = selectedCards;

      if (selectedCards.length === 3) {
        const isSet = checkSet(selectedCards);
        newState.isSet = isSet;
        if (isSet) {
          setFound();
            // TODO: update players
            const newDeck = replaceCards(deck, selectedCards);
            newState.deck = newDeck;
            newState.cardsShowing = Math.min(12, newDeck.length);
        } else {
          // alert(isSet[1]);
          setNotFound();
        }
        setTimeout(() => {
          // this.currentSet[0].bg = this.color2;
          // this.currentSet[1].bg = this.color2;
          // this.currentSet[2].bg = this.color2;
          // this.setState({ clicked: 0 });
          // const isSet = checkSet(selectedCards);
          newState.isSet = null;
          // if (isSet) {
          //   setFound();
          // } else {
          //   alert(isSet[1]);
          // }
          // newState.isSet = isSet;
          newState.selectedCards = [];
         // newState.set = [];
         newState.timeRemaining = 10;
         newState.turn = null;
         newState.activePlayer = '';
          // newState.currentSet = [];
          if (checkForWin(deck)) {
            const scoreboardText = getWinner(players);
            console.log('scoreboard: ', scoreboardText);
            newState.status = 'ended';
          }
          console.log('timeout newState: ', newState);
          return newState;
        }, 500);
      }
      console.log('newState: ', newState);
      return newState;
    }

    // case 'CONTINUE': {
    //   const newState = clone(state);
    //   const { deck, selectedCards } = newState;
    //   const newDeck = replaceCards(deck, selectedCards);
    //   newState.deck = newDeck;
    //   newState.cardsShowing = Math.min(12, newDeck.length);
    //   newState.isSet = null;
    //   // newState.isSet = false;
    //   newState.selectedCards = [];
    //   // newState.set = [];
    //   newState.timeRemaining = 10;
    //   newState.turn = null;
    //   return newState;
    // }

    // case 'CLEAR': {
    //   const newState = clone(state);
    //   newState.isSet = null;
    //   // newState.isSet = false;
    //   newState.selectedCards = [];
    //   // newState.set = [];
    //   newState.timeRemaining = 10;
    //   return newState;
    // }

    // case 'COUNTDOWN': {
    //   const newState = clone(state);
    //   const { timeRemaining } = newState;
    //   newState.timeRemaining = timeRemaining - 1;
    //   return newState;
    // }

    case 'ADD_CARDS': {
      if (state.deck.length < 15) {
        return state;
      }
      const newState = clone(state);
      newState.cardsShowing = 15;
      return newState;

    }

    case 'SELECT_DIFFICULTY': {
      if (state.difficulty === action.payload) {
        return state;
      }
      const newState = clone(state);
      newState.difficulty = action.payload;
      // DIFFICULTY_VALUES = obj providing milliseconds and dropdown label values for state values
      return newState;
    }

    default:
      console.error(action.type, "with a ", action.payload, "payload, is an unknown action type in gameReducer");
      return state
  }
};