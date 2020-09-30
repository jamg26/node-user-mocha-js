const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
  let joe;
  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      likes: 0
    });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(user => {
        assert(user.length === 1);
        assert(user[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', done => {
    joe.set({
      name: 'Alex'
    });

    assertName(joe.save(), done);
  });

  it('A model instance can update', done => {
    assertName(
      joe.updateOne({
        name: 'Alex'
      }),
      done
    );
  });

  it('A model class can update', done => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', done => {
    assertName(
      User.findOneAndUpdate(
        { name: 'Joe' },
        { name: 'Alex' },
        { useFindAndModify: false }
      ),
      done
    );
  });

  it('A model class can update using id as reference', done => {
    assertName(
      User.findByIdAndUpdate(
        joe._id,
        { name: 'Alex' },
        { useFindAndModify: false }
      ),
      done
    );
  });

  it('A user can have their postCount incremented by 1', done => {
    User.updateOne({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 10);
        done();
      })
      .catch(err => console.log(err));
  });
});
