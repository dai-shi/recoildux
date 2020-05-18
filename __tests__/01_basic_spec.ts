import { createAtom, useAtom } from '../src/index';

describe('basic spec', () => {
  it('exported function', () => {
    expect(createAtom).toBeDefined();
    expect(useAtom).toBeDefined();
  });
});
