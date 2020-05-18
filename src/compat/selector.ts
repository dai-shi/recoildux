/* eslint no-use-before-define: off */
/* eslint @typescript-eslint/no-use-before-define: off */
/* eslint @typescript-eslint/no-explicit-any: off */

import { Dispatch } from 'redux';

import { Atom, Action, createAtom } from '../createAtom';
import { ATOM_SYMBOL } from './atom';

type Options<State> = {
  key: string;
  get: (arg: {
    get: (a: Atom<any>) => any;
  }) => State | Promise<State>;
  set?: (arg: {
    get: (a: Atom<any>) => any;
    set: (a: Atom<any>, v: any) => void;
  }, newValue: any) => void;
};

export const selector = <State>(
  options: Options<State>,
) => {
  const atoms: Atom<any>[] = [];
  const unsubscribes: (() => void)[] = [];
  const getGet = (a: Atom<any>) => {
    if (!atoms.includes(a)) {
      atoms.push(a);
      unsubscribes.push(a.patchedStore.subscribe(evaluate));
    }
    return a.patchedStore.getState();
  };
  const setGet = (a: Atom<any>) => a.patchedStore.getState();
  const setSet = (a: Atom<any>, v: any) => {
    a.patchedStore.dispatch({
      type: 'SetState',
      setState: v,
    });
  };

  const atom = createAtom(null as State | null);
  const origDispatch = atom.patchedStore.dispatch;
  const evaluate = async () => {
    origDispatch({
      type: 'SetState',
      setState: await options.get({ get: getGet }),
    });
  };
  const origSubscribe = atom.patchedStore.subscribe;
  let subscribeCount = 0;
  atom.patchedStore.subscribe = (callback: () => void) => {
    const unsubscribe = origSubscribe(callback);
    if (subscribeCount === 0) {
      evaluate();
    }
    subscribeCount += 1;
    return () => {
      unsubscribe();
      subscribeCount -= 1;
      if (subscribeCount === 0) {
        unsubscribes.forEach((unsub) => unsub());
        unsubscribes.splice(0, unsubscribes.length);
        atoms.splice(0, atoms.length);
      }
    };
  };
  atom.patchedStore.dispatch = ((action: Action<State>) => {
    if (action.type === 'SetState') {
      if (typeof action.setState === 'function') {
        throw new Error('function update is not allowed');
      }
      if (!options.set) {
        throw new Error('not writable selector');
      }
      options.set({ get: setGet, set: setSet }, action.setState);
    }
    return action;
  }) as Dispatch<Action<State | null>>;
  return {
    ...atom,
    symbol: ATOM_SYMBOL,
    key: options.key,
    initialState: null,
    writable: !!options.set,
  };
};
