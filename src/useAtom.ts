import { SetStateAction, useCallback } from 'react';
import { useTrackedState } from 'reactive-react-redux';

import { Atom, Action } from './createAtom';

export const useAtom = <State>(atom: Atom<State>) => {
  const state = useTrackedState(atom.patchedStore);
  const setState = useCallback((setStateAction: SetStateAction<State>) => {
    const action: Action<State> = {
      type: 'SetState',
      setState: setStateAction,
    };
    atom.patchedStore.dispatch(action);
  }, [atom]);
  return [state, setState] as const;
};
