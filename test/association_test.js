const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({
      name: 'Joe'
    });
    blogPost = new BlogPost({
      title: 'JS Mongo',
      content: 'Hehe'
    });

    comment = new Comment({
      content: 'Im a comment'
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it('Saves a relation between a user and blogPost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS Mongo');
        done();
      });
  });

  it('Saves a full relation graph.', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS Mongo');
        assert(user.blogPosts[0].comments[0].content === 'Im a comment');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
