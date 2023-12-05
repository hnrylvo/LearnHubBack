const Post = require("../models/post.model");
const debug = require("debug")("app:post-controller");


const controller = {};

controller.save = async (req, res, next) => {
    try {
        const { title, review } = req.body;
        const { identifier } = req.params;
        const { user } = req;

        /*  const post = new Post({
             title: title,
             description: description,
             image: image,
 
         }); */

        let post = await Post.findById(identifier);

        if (!post) {
            post = new Post();
            post["user"] = user._id;
        } else {
            if (!post["user"].equals(user._id)) {
                return res.status(403).json({ error: "El usuario y post no coinciden" });
            }
        }

        post["title"] = title;
        post["review"] = review;

        const postSaved = await post.save();
        if (!postSaved) {
            res.status(409).json({ error: "Error creating post" });
        }
        return res.status(201).json(postSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.findAll = async (req, res, next) => {
    try {
        const post = await Post.find({ hidden: false })
            .populate("user", "username email");

        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

controller.findOneById = async (req, res, next) => {

    try {
        const { identifier } = req.params;

        const post = await Post.findOne({ _id });
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

controller.deleteById = async (req, res, next) => {
    try {
        const { identifier } = req.params;

        const post = await Post.findByIdAndDelete(identifier);

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }

        return res.status(200).json({ message: "Post Deleted" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.ToggleHidden = async (req, res, next) => {
    try {
        const { identifier } = req.params;
        const user = req.user;

        const post =
            await Post.findOne({ _id: identifier, user: user._id })
                .populate("user", "username email -_id")

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.hidden = !post.hidden;

        const newPost = await post.save();
        return res.status(200).json(newPost);

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.saveComment = async (req, res, next) => {
    try {
        const { identifier } = req.params;
        const { comment } = req.body;
        const user = req.user;

        //obtener el post
        const post = await Post.findOne({ _id: identifier })
        .populate("user", "username email");

// Verificar que el post exista
if(!post){
    return res.status(404).json({error: "Post no found "});
}
//añadir el comentario
let _review = post ["review"];
_review = [..._review,{user: user._id, timestamps: new Date(), comment, qualification}];

//guardar el post
post["review"] = _review;
const newPost = 
await (await post.save())
.populate("comment.user", "username mail");

return res.status(200).json(newPost);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = controller;

