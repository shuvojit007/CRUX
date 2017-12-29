const Post = require('../models/post');
const User = require('../models/user');
module.exports = {
    //Add post by specific user
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
        res.status(200).json({ sucess: true });
    },
    //Get All Post
    GetAllPost: async(req, res) => {
        const AllPost = await Post.find({}).populate('user');
        res.status(200).json(AllPost);
    },

    //Get All post by specific user
    GetAllPostBySpecificUser: async(req, res) => {
        const post = await Post.find({ user: req.user._id }).sort({ date: -1 });
        console.log(post)
        if (post.count() == 0) {
            res.status(400).json(post)
        }
        res.status(200).json(post);
    },

    //Get post by post Id
    GetPostById: async(req, res) => {
        const post = await Post
            .findById(req.value.params.postId).populate("user");
        res.status(200).json(post);
    },

    //Update Post
    UpdatePost: async(req, res) => {
        const post = await Post
            .findByIdAndUpdate(req.value.params.postId,
                req.value.body);
        res.status(200).json({ sucess: true });
    },

    //Delete post
    DeletePostById: async(req, res) => {
        const post = await Post.findById(req.value.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post doesn\'t exist" })
        }
        const user = await User.findById(post.user);
        user.post.pull(post)
        await user.save()
        await post.remove();
        res.status(200).json({ seucess: true });
    }

}