//import all models
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post')

User.hasMany(Post, {
    foreignKey: 'user_id', //why user_id?
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'user_id' //why no on delete?
});


Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'user_id' //why no on delete?
});


User.hasMany(Comment, {
    foreignKey: 'user_id' //why no on delete?
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Comment, Post}