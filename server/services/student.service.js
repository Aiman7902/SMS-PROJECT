import prisma from '../config/prisma.js';

export const getAllStudents = async () => {
  return await prisma.student.findMany({
    include: { class: true },
    orderBy: { createdOn: 'desc' }
  });
};

export const createStudent = async (studentData) => {
  const { name, studentId, grade } = studentData;
  
  return await prisma.student.create({
    data: {
      name,
      studentId,
      grade,
      status: 'active',
      classId: 1,
      createdById: 1,
      updatedById: 1,
      lockCount: 1
    }
  });
};

export const deleteStudent = async (id) => {
  return await prisma.student.delete({
    where: { id }
  });
};