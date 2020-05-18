import { SetStateAction, useCallback } from 'react';

import { Atom, Action } from '../createAtom';

export const useSetRecoilState = <State>(atom: Atom<State>) => {
  const setState = useCallback((setStateAction: SetStateAction<State>) => {
    const action: Action<State> = {
      type: 'SetState',
      setState: setStateAction,
    };
    atom.patchedStore.dispatch(action);
  }, [atom]);
  return setState;
};
