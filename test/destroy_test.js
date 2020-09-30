const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;
  beforeEach(done => {
    joe = new User({
      name: 'Joe'
    });
    joe.save().then(() => done());
  });

  it('Model instance remove', done => {
    joe
      .remove()
      .then(() => {
        console.log('removing');
        return User.findOne({ name: 'Joe' });
      })
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('Class method remove', done => {
    joe
      .remove({
        name: 'Joe'
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it('Class method findOneAndRemove', done => {
    User.findOneAndRemove(
      {
        name: 'Joe'
      },
      { useFindAndModify: false }
    )
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it('Class method findByIdAndRemove', done => {
    User.findByIdAndRemove(joe._id, { useFindAndModify: false })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
