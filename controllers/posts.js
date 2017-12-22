const Post = require('../models/post');
const User = require('../models/user');
module.exports = {
    AddPost: async(req, res) => {
        //Find the User
        const user = await User.findById(req.user._id)
        const data = req.value.body;
        data.user = user;
        const post = new Post(data);
        await post.save();

        //add post to user model
        user.post.push(post)
        await user.save();

        //we are done
        res.status(200).json(post);
    },
    GetAllPost: async(req, res) => {
        const AllPost = await Post.find({});
        res.status(200).json(AllPost);
    },
    GetPostById: async(req, res) => {
        const post = await Post
            .findById(req.value.params.postId);
        res.status(200).json(post);
    },
    UpdatePost: async(req, res) => {
        const post = await Post
            .findByIdAndUpdate(req.value.params.postId,
                req.value.body);
        res.status(200).json({ sucess: true });
    },
    DeletePostById: async(req, res) => {
        res.status(200).send("Pending")
    }

}