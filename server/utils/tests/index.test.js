import { isTestEnv } from '@utils/index';

describe('isTestEnv', () => {
  it("should return true if the ENVIRONMENT_NAME is 'test'", () => {
    expect(isTestEnv()).toBe(true);
  });
});
