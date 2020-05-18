import { Atom, Action } from '../createAtom';
declare type Options<State> = {
    key: string;
    get: (arg: {
        get: (a: Atom<any>) => any;
    }) => State | Promise<State>;
    set?: (arg: {
        get: (a: Atom<any>) => any;
        set: (a: Atom<any>, v: any) => void;
    }, newValue: any) => void;
};
export declare const selector: <State>(options: Options<State>) => {
    symbol: symbol;
    key: string;
    initialState: null;
    writable: boolean;
    patchedStore: import("reactive-react-redux").PatchedStore<State | null, Action<State | null>>;
};
export {};
