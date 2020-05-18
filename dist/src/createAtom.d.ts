import { SetStateAction } from 'react';
import { PatchedStore } from 'reactive-react-redux';
export declare type Action<State> = {
    type: 'SetState';
    setState: SetStateAction<State>;
};
export declare type Atom<State> = {
    patchedStore: PatchedStore<State, Action<State>>;
};
export declare const createAtom: <State>(initialState: State) => Atom<State>;
