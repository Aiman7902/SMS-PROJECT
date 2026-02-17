import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../utils/constants';
import { apiClient } from '../../utils/api-client';
import './student.css';
import StudentView from './student.view';
import AddStudent from './AddStudent/add-student'; 
import DeleteStudent from './DeleteStudent/delete-student';


const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // 1. State to control the Add Student Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchStudents = () => {
    setLoading(true);
    apiClient(API_ENDPOINTS.STUDENTS.LIST)
      .then(data => {
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

  return (
    <>
      <StudentView 
        students={filteredStudents} 
        loading={loading} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setIsModalOpen(true)} 
        onDeleteClick={handleDeleteClick}   
      />

      {/* 3. Render the Modal if state is true */}
      {isModalOpen && (
        <AddStudent 
          onClose={() => setIsModalOpen(false)} 
          onRefresh={fetchStudents} 
        />
      )}
      {/* Delete Student Modal */}
      {isDeleteModalOpen && (
          <DeleteStudent 
              student={selectedStudent}
              onClose={() => setIsDeleteModalOpen(false)}
              onRefresh={fetchStudents}
          />
      )}
    </>
  );
};

export default Student;