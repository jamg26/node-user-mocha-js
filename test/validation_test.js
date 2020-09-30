const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
  it('Requires name', done => {
    const user = new User({
      name: undefined
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
    done();
  });

  it('Requires name longer than 2 characters.', done => {
    const user = new User({
      name: 'a'
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
    done();
  });

  it('Disallows invalid records from being saved', done => {
    const user = new User({
      name: 'Al'
    });
    user.save().catch(err => {
      const { message } = err.errors.name;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});
