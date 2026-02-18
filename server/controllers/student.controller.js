import { asyncHandler } from '../middleware/async-handler.js';
import * as studentService from '../services/student.service.js';

// GET ALL STUDENTS
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await studentService.getAllStudents();
  res.json(students);
});

// CREATE NEW STUDENT
export const createStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const newStudent = await studentService.createStudent(studentData);
  res.status(201).json({ success: true, data: newStudent });
});

// UPDATE STUDENT
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentData = req.body;
  const updatedStudent = await studentService.updateStudent(parseInt(id), studentData);
  res.json({ success: true, data: updatedStudent });
});

// DELETE STUDENT
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await studentService.deleteStudent(parseInt(id));
  res.status(200).json({ 
    success: true, 
    message: "Student deleted successfully" 
  });
});