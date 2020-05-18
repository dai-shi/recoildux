import { useCallback } from 'react';

import { Atom, Action } from '../createAtom';

export const useResetRecoilState = <State>(
  atom: Atom<State> & { initialState: State },
) => {
  const resetState = useCallback(() => {
    const action: Action<State> = {
      type: 'SetState',
      setState: atom.initialState,
    };
    atom.patchedStore.dispatch(action);
  }, [atom]);
  return resetState;
};
