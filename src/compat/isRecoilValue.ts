import { ATOM_SYMBOL } from './atom';

export const isRecoilValue = (x: unknown) => {
  try {
    return (x as { symbol: unknown }).symbol === ATOM_SYMBOL;
  } catch (e) {
    return false;
  }
};
