const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('Can create subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'JS' }, { title: 'Python' }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 2);
        done();
      });
  });

  it('Can add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'C#' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('Can remove existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {
          title: 'JS'
        }
      ]
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
