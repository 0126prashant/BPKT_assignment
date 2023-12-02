const express = require('express');
const StudentModel = require('../model/student');
const studentRouter = express.Router();


// Add the new student
studentRouter.post("/add",async(req,res)=>{
    try {
        const student = new StudentModel(req.body);
        await student.save();
        return res.status(200).json({msg:"The new Student has been Added",newStudent:student})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get all Student
studentRouter.get("/",async(req,res)=>{
    try {
        const students =await StudentModel.find({});
        res.status(200).send(students)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get one student via ID
studentRouter.get("/:studentID",async (req, res) => {
    try {
        const singleStudent = await StudentModel.findOne({_id: req.params.studentID})
        res.status(200).send(singleStudent)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  });


//   Update Student
studentRouter.patch("/:studentID",async (req,res)=>{
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.studentID,req.body,{new:true})
        res.status(200).send({msg:"Student has been updated",updatedStudent})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete the Student

studentRouter.delete("/:studentID", async (req, res) => {
    const {studentID} = req.params
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(studentID)
        res.status(200).send({msg:"Student has been deleted",deletedStudent})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
  });

  module.exports = {
    studentRouter
  };
  