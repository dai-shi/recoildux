export declare const ATOM_SYMBOL: unique symbol;
export declare const atom: <State>(options: {
    key: string;
    default: State;
}) => {
    symbol: symbol;
    key: string;
    initialState: State;
    writable: boolean;
    patchedStore: import("reactive-react-redux").PatchedStore<State, import("../createAtom").Action<State>>;
};
