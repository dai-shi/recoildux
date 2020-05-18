import { Atom } from '../createAtom';
export declare const useResetRecoilState: <State>(atom: Atom<State> & {
    initialState: State;
}) => () => void;
