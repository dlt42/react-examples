import { describe, expect, it } from 'vitest';

import { createArray, getErrorMessage } from './util';

describe('utils', () => {
  it('createArray works', () => {
    const array = createArray(10);
    expect(Array.isArray(array)).to.be.true;
    expect(array.length).to.equal(10);
  });

  it('getErrorMessage works with an error', () => {
    const msg = getErrorMessage(new Error('An error occurred'));
    expect(msg).to.equal('An error occurred');
  });

  it('getErrorMessage works with an object', () => {
    const msg = getErrorMessage({ someError: 'Some error' });
    expect(msg).to.equal('{"someError":"Some error"}');
  });

  it('getErrorMessage works with null', () => {
    const msg = getErrorMessage(null);
    expect(msg).to.equal('');
  });

  it('getErrorMessage works with undefined', () => {
    const msg = getErrorMessage(undefined);
    expect(msg).to.equal('');
  });
});
