import { SetStateAction } from 'react';
import { Atom, Action } from '../createAtom';
declare type Options<State> = {
    key: string;
    get: (arg: {
        get: <S>(a: Atom<S>) => S;
    }) => State | Promise<State>;
    set?: (arg: {
        get: <S>(a: Atom<S>) => S;
        set: <S>(a: Atom<S>, v: SetStateAction<S>) => void;
    }, newValue: State) => void;
};
export declare const selector: <State>(options: Options<State>) => {
    symbol: symbol;
    key: string;
    initialState: null;
    writable: boolean;
    patchedStore: import("reactive-react-redux").PatchedStore<State | null, Action<State | null>>;
};
export {};
