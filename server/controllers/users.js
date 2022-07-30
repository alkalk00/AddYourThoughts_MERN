const { default: mongoose } = require('mongoose');
const PostMessage = require('../models/schems');

exports.postReq = async (req,res)=>{
    const posts = req.body;
    const newPosts = new PostMessage(posts);
    try{
        await newPosts.save();
        res.status(201).json(newPosts);
    }catch(err){
        console.log(err)
    }
}

exports.getReq = async (req,res)=>{
    try{
        const messages = await PostMessage.find();
        res.status(200).json(messages);
    }catch(err){
        console.log(err)
    }
}

exports.updPost = async (req,res)=>{
    const {id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const  updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true})

    res.json(updatedPost);
}

exports.deletePost = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found')

    await PostMessage.findByIdAndDelete(id);
    console.log('delte')

    res.json({message: "post deleted successfully"})
}

exports.likePost = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found')
    
    const post = await PostMessage.findById(id);
    const updPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount +1}, {new: true})

    res.json(updPost);
}