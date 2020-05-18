/// <reference types="react" />
export declare const useRecoilState: <State>(atom: import("../createAtom").Atom<State>) => readonly [State, (setStateAction: import("react").SetStateAction<State>) => void];
