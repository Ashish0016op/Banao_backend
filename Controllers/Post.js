const UserPost=require('../Model/Post');
const User=require('../Model/User');
const Comment = require('../Model/Comment');
exports.UserPost=async(req,res,next)=>{
    try{
        const title=req.body.title;
        const category=req.body.Category;
        const Description=req.body.Description;
        const ImageURL=req.body.ImageURL;
        const UserId=req.body.UserId;
        const UserPostDetail=new UserPost({
            Title:title,
            ImageURL:ImageURL,
            User:UserId
        });
        await UserPostDetail.save();
        return res.status(200).json({UserPostDetail:UserPostDetail});
    }catch(err){
        return res.status(400).json({err:err.message});
    }
}
exports.getPost=async(req,res,next)=>{
    try{
        const AllPost =await UserPost.find().populate('User');
        return res.status(200).json({AllPost:AllPost});
    }catch(err){
        return res.status(400).json({err:err.message});
    }
}
exports.deletePost=async(req,res,next)=>{
    try{
        const postId = req.params.id;
        const deletedPost = await UserPost.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
        
    }catch(err){
        return res.status(400).json({err})
    }
}
exports.getPostById=async(req,res,next)=>{
    try{
        const PostId=req.params.id;
        const post=await UserPost.findById(PostId);
        if(!post){
            return res.status(404).json({message:"post not found"});
        }
        return res.status(200).json({message:'post get successfully',post});
    }catch(err){
        res.status(500).json({ error: 'Failed to get the post' });
    }
}
exports.LikedPost=async(req,res,next)=>{
    const { postId, UserId } = req.body;

    try {
        const updatedPost = await UserPost.findByIdAndUpdate(
            postId,
            { $addToSet: { Liked: UserId }, $inc: { LikeCount: 1 } },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).json({ error: 'Failed to like the post' });
    }
}

exports.CommentPost = async (req, res, next) => {
    const { postId, userId, content } = req.body;
    console.log(postId, userId, content);

    try {
        const newComment = new Comment({
            content,
            user: userId,
            post: postId
        });
        await newComment.save();
        const updatedPost = await UserPost.findByIdAndUpdate(
            postId,
            { $push: { Comments: newComment._id } },
            { new: true }
        );

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error('Error adding comment:', err);
        return res.status(500).json({ error: 'Failed to add comment' });
    }
};
exports.getComment=async(req,res,next)=>{
    try{
        const AllComment =await Comment.find().populate('user');
        return res.status(200).json(AllComment)
    }catch(err){
        res.status(500).json({ error: 'Failed to get comment' });
    }
}

  