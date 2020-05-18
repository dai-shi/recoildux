import { useTrackedState } from 'reactive-react-redux';

import { Atom } from '../createAtom';

export const useRecoilValue = <State>(atom: Atom<State>) => useTrackedState(atom.patchedStore);
