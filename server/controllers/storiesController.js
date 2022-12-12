import Story from "../models/storyContent.js";
import mongoose from "mongoose";

const getStories = async (req, res) => {
    try {
        const story = await Story.find();
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

};

const getOwnStories = async (req, res) => {
    try {
        const story = await Story.find({username: req.user});
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

};

const createStory = async (req, res) => {
    const body = req.body;

    const newStory = new Story({
        ...body
    });

    try {
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  
};
const updateStory = async (req, res) => {
    const { id: _id} = req.params;

    const story = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("This id dosent exist");
    }

    const updatedStory = await Story.findByIdAndUpdate(_id, story, { new: true });

    res.json(updatedStory);
}

const deleteStory = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("This story id dosent exist");
    }

    // const user = req.user
    // const story = await Story.find({username:user});
    // console.log(story)
    try {
        // await story.map(s => {
        //     if (s._id === id) {
        //         Story.findByIdAndRemove(id);
        //     }
        // })
        await Story.findByIdAndRemove(id);
        res.json({ message: "Story has been deleted"});
    }
    catch(e) {
        console.log(e)

    }
    
  
};

const likeStory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("This id dosent exist");
    }

    const story = await Story.findById(id);

    const updatedStory = await Story.findByIdAndUpdate(id, { likes: story.likes + 1}, { new: true });

    res.json(updatedStory);
}



export { getStories, createStory, updateStory, deleteStory, likeStory, getOwnStories };
