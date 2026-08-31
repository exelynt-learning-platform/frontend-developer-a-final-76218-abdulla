const jestGlobals = require('@jest/globals');

module.exports = {
  describe: jestGlobals.describe,
  it: jestGlobals.it,
  test: jestGlobals.test,
  expect: jestGlobals.expect,
  beforeEach: jestGlobals.beforeEach,
  afterEach: jestGlobals.afterEach,
  beforeAll: jestGlobals.beforeAll,
  afterAll: jestGlobals.afterAll,
  vi: {
    fn: jestGlobals.jest.fn,
    spyOn: jestGlobals.jest.spyOn,
    clearAllMocks: jestGlobals.jest.clearAllMocks,
    resetAllMocks: jestGlobals.jest.resetAllMocks,
    mock: jestGlobals.jest.mock,
  },
};
