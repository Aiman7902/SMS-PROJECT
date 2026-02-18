import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../utils/constants';
import { apiClient } from '../../utils/api-client';
import './student.css';
import StudentView from './student.view';
import AddStudent from './AddStudent/add-student';
import EditStudent from './EditStudent/edit-student';
import DeleteStudent from './DeleteStudent/delete-student';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

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
        onAddClick={() => setIsAddModalOpen(true)}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}   
      />

      {isAddModalOpen && (
        <AddStudent 
          onClose={() => setIsAddModalOpen(false)} 
          onRefresh={fetchStudents} 
        />
      )}

      {isEditModalOpen && (
        <EditStudent
          student={selectedStudent}
          onClose={() => setIsEditModalOpen(false)}
          onRefresh={fetchStudents}
        />
      )}

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