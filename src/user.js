const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('./post');

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [postSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});
userSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

userSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  //const Comments = mongoose.model('comment')
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
    .then(() => next())
    .catch(err => console.log(err.reason));
});

const User = mongoose.model('user', userSchema);

module.exports = User;
