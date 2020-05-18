import { SetStateAction } from 'react';
import { Atom } from '../createAtom';
export declare const useSetRecoilState: <State>(atom: Atom<State>) => (setStateAction: SetStateAction<State>) => void;
