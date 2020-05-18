import { createAtom } from '../createAtom';

export const ATOM_SYMBOL = Symbol();

export const atom = <State>(
  options: { key: string; default: State },
) => {
  const a = createAtom(options.default);
  return {
    ...a,
    symbol: ATOM_SYMBOL,
    key: options.key,
    initialState: options.default,
    writable: true,
  };
};
