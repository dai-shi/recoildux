import { SetStateAction } from 'react';
import { Atom } from './createAtom';
export declare const useAtom: <State>(atom: Atom<State>) => readonly [State, (setStateAction: SetStateAction<State>) => void];
