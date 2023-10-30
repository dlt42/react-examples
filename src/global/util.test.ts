import { describe, expect, it } from 'vitest';

import { createArray } from './util';

describe('Utils', () => {
  it('createArray works', () => {
    const array = createArray(10);
    expect(Array.isArray(array)).to.be.true;
    expect(array.length).to.equal(10);
  });
});
