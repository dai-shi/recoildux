import { Dispatch, createStore } from 'redux';
import { patchStore } from 'reactive-react-redux';

import { Atom, Action } from './createAtom';

// XXX there might be better implementation for this
export const combineAtoms = <State>(
  atoms: { [key in keyof State]: Atom<State[key]> },
): Atom<State> => {
  const initialState = {} as State;
  Object.keys(atoms).forEach((key) => {
    initialState[key as keyof State] = atoms[key as keyof State].patchedStore.getState();
  });
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
  const origDispatch = store.dispatch;
  Object.keys(atoms).forEach((key) => {
    const s = atoms[key as keyof State].patchedStore;
    s.subscribe(() => {
      origDispatch({
        type: 'SetState',
        setState: (prev: State) => ({ ...prev, [key]: s.getState() }),
      });
    });
  });
  store.dispatch = ((action: Action<State>) => {
    if (action.type === 'SetState') {
      const nextState = typeof action.setState === 'function'
        ? (action.setState as (prevState: State) => State)(store.getState())
        : action.setState as State;
      Object.keys(atoms).forEach((key) => {
        if (nextState[key as keyof State] !== store.getState()[key as keyof State]) {
          atoms[key as keyof State].patchedStore.dispatch({
            type: 'SetState',
            setState: nextState[key as keyof State],
          });
        }
      });
    }
    return action;
  }) as Dispatch<Action<State>>;
  const patchedStore = patchStore(store);
  return { patchedStore };
};
