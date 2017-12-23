const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');

module.exports = {
    PostComment: (req, res) => {
        const newComment = req.value.body;

        // const post = await Post.findById(req.value.params.postId)
        // newComment.post = post;

        // const user = await User.findById(req.user._id);
        // newComment.user = user;

        // // console.log(newComment)
        // const comment = new Comments(newComment);

        // await comment.save();

        // post.comments.push(comment)
        // await post.save();
        // console.log(post)
        try {
            Post.findById(req.value.params.postId)
                .then(post => {
                    newComment.post = post;
                    return User.findById(req.user._id)
                }).then(user => {
                    newComment.user = user;
                    const comment = new Comments(newComment);
                    return comment.save();
                }).then(comment => {
                    console.log(comment)
                        //  post.comments.push(comment);
                        // return post.save()
                    return Post.findById(comment.post._id)
                }).then(post => {
                    res.status(200).json(post);
                })
                .catch(e => {
                    res.status(200).send(e);
                })
        } catch (error) {
            res.status(200).send(error);
        }



    }
}