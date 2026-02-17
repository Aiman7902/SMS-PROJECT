import React, { useState } from 'react';
import AddStudentView from './add-student.view';
import { API_ENDPOINTS } from '../../../utils/constants';
import { apiClient } from '../../../utils/api-client';
import './add-student.css';

const AddStudent = ({ onRefresh, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        grade: '',
        status: 'ACTIVE'
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            // Promise.all waits for BOTH the API and the timer to finish
            await Promise.all([
                apiClient(API_ENDPOINTS.STUDENTS.CREATE, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                }),
                new Promise(resolve => setTimeout(resolve, 1500)) // Force 1.5s delay
            ]);

            onRefresh();
            onClose();
        } catch (error) {
            alert("Failed to save student: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AddStudentView 
            formData={formData} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            loading={loading}
            onClose={onClose} 
        />
  );
};

export default AddStudent;