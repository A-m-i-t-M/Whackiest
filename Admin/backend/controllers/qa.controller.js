import QA from "../models/qa.model.js";

export const createQuestion=async(req,res)=>{
    try{
        const {mandir,mandirName,question} =req.body;
        if(!mandir||!mandirName||!question){
            return res.status(404).json({ message: "Something is missing" });
        }
        const qa=new QA({
            user:req.user._id,
            userName:req.user.username,
            mandir,
            mandirName,
            question,
        })
        await qa.save();
        res.status(201).json({ message: "Question created created successfully", qa });
    }catch(error){
        res.status(500).json({ message: "Error creating question", error: error.message });
    }
}

export const getQuestionsForAdmin=async(req,res)=>{
    try{
        const qas=await Darshan.find({mandir:req.user._id});
        res.status(200).json({qas})
    }catch(error){
        res.status(500).json({ message: "Error fetching qas", error: error.message });
    }
}

export const getQAsforClient=async(req,res)=>{
    try{
        const qas=await Darshan.find({user:req.user._id});
        res.status(200).json({qas})
    }catch(error){
        res.status(500).json({ message: "Error fetching qas", error: error.message });
    }
}

export const giveAnswer=async(req,res)=>{
    const { questionId, answer } = req.body;

  try {
    const updatedQA = await QA.findByIdAndUpdate(
      questionId,
      { answer },
      { new: true }
    );

    if (!updatedQA) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({
      message: 'Answer updated successfully',
      updatedQA,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update answer', error });
  }
}

export const deleteQuestion=async(req,res)=>{
    try{
        const { qaId } = req.body;

        if (!qaId) {
            return res.status(400).json({
                success: false,
                message: "QA ID is required.",
            });
        }

        const qa = await QA.findOne({ _id: qaId, user: req.user._id });

        if (!qa) {
            return res.status(404).json({
                success: false,
                message: "QA not found or you don't have access to it.",
            });
        }
        await QA.findByIdAndDelete(qaId);

        res.status(200).json({
            success: true,
            message: "QA deleted successfully.",
        });
    }catch(error){
        res.status(500).json({ message: 'Failed to delete qas', error });
    }
}