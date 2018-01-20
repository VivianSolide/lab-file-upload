const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const Comment = require('./comment');

const PostSchema = Schema({
  content: String,
  creatorId:    String,
  picPath: String,
  picName:      String,
  comments: []
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
