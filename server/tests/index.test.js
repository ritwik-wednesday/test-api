describe('init', () => {
  const mocks = {};
  it('should successfully configure environment variables and connect to the database', async () => {
    mocks.dotenv = {
      config: jest.fn
    };
    jest.doMock('dotenv', () => mocks.dotenv);
    jest.spyOn(mocks.dotenv, 'config');
    await require('../index');

    // check if the environments are being configured correctly
    expect(mocks.dotenv.config.mock.calls.length).toBe(2);
  });

  it('should ensure the no of call to app.use', async () => {
    const { init, app } = await require('../index');
    mocks.app = app;
    jest.spyOn(mocks.app, 'use');
    await init();

    // check if the server has been started
    expect(mocks.app.use.mock.calls.length).toBe(7);
    expect(mocks.app.use.mock.calls[0][0]).toEqual(expect.any(Function));
  });
});
