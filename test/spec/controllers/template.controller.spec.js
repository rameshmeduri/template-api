import sinon from 'sinon';
import controller from '../../../src/controllers/template.controller';

describe('Template Controller', () => {
  let sandbox;
  let expressResponse;

  // setup sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const innerJson = sandbox.spy();
    const status = sandbox
      .mock()
      .returns({ json: innerJson })
      .once();
    status.innerJson = innerJson;

    expressResponse = {
      json: sandbox.spy(),
      sendStatus: sandbox.spy(),
      status,
    };
  });

  // restore sandbox
  afterEach(() => {
    sandbox.restore();
    expressResponse = undefined;
  });

  it('Should respond with OK', done => {
    const testBody = {};
    // expected response
    const response = 'OK';

    // Call the controller
    controller(testBody, expressResponse);
    // Assert cb is called with the specified response
    sinon.assert.calledWith(expressResponse.json, response);

    done();
  });
});
