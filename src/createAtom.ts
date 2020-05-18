import { SetStateAction } from 'react';
import { createStore } from 'redux';
import { PatchedStore, patchStore } from 'reactive-react-redux';

export type Action<State> = {
  type: 'SetState';
  setState: SetStateAction<State>;
};

export type Atom<State> = {
  patchedStore: PatchedStore<State, Action<State>>;
};

export const createAtom = <State>(initialState: State): Atom<State> => {
  const reducer = (state = initialState, action: Action<State>) => {
    if (!action || action.type !== 'SetState') {
      return state;
    }
    if (typeof action.setState === 'function') {
      return (action.setState as (prevState: State) => State)(state);
    }
    return action.setState as State;
  };
  const store = createStore(reducer);
  const patchedStore = patchStore(store);
  return { patchedStore };
};
