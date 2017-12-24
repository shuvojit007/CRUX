const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');

module.exports = {
    PostComment: async(req, res) => {
        const newComment = req.value.body;

        const post = await Post.findById(req.value.params.postId);
        newComment.post = post;

        const user = await User.findById(req.user._id);
        newComment.user = user;

        const comment = new Comments(newComment);
        await comment.save();

        post.comments.push(comment)
        await post.save();
        user.comments.push(comment)
        await user.save();

        res.status(200).json({ sucess: true })
    },

    GetAllPostComntById: async(req, res) => {
        const comment = await Comments.find({ post: req.value.params.postId }).populate(["user", "post"]);
        res.status(200).json(comment)
    }
}