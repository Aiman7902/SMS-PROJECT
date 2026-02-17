import express from 'express';
import prisma from '../config/prisma.js';

const router = express.Router();

// 1. GET ALL STUDENTS
router.get('/', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { class: true },
      orderBy: { createdOn: 'desc' }
    });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. CREATE NEW STUDENT (This was the missing piece!)
router.post('/', async (req, res) => {
  try {
    const { name, studentId, grade } = req.body;

    const newStudent = await prisma.student.create({
      data: {
        name,
        studentId,
        grade,
        status: 'active',
        // FIX: Use real Integers, not Strings
        classId: 1,      
        createdById: 1,  
        updatedById: 1,
        lockCount: 1
      }
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("DEBUG ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.student.delete({
            where: { id: parseInt(id) }
        });

        // 🟢 FIX: Always return a JSON object, not just a status code
        return res.status(200).json({ 
            success: true, 
            message: "Student deleted successfully" 
        });

    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;