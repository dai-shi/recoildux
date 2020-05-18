import { Atom } from './createAtom';
export declare const combineAtoms: <State>(atoms: { [key in keyof State]: Atom<State[key]>; }) => Atom<State>;
