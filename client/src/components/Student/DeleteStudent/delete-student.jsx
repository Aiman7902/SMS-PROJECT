import React, { useState } from 'react';
import DeleteStudentView from './delete-student.view';
import { API_ENDPOINTS } from '../../../utils/constants';
import { apiClient } from '../../../utils/api-client';
import './delete-student.css';

const DeleteStudent = ({ student, onRefresh, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

const handleDelete = async () => {
        setLoading(true);
        try {
            await Promise.all([
                apiClient(API_ENDPOINTS.STUDENTS.DELETE(student.id), {
                    method: 'DELETE'
                }),
                new Promise(resolve => setTimeout(resolve, 1500))
            ]);

            setSuccess(true); // 1. Show the checkmark
            
            // 2. WAIT for 1.2 seconds so the user sees it
            setTimeout(() => {
                onRefresh();
                onClose();
            }, 1200); 

        } catch (error) {
            alert("Failed to delete: " + error.message);
            setLoading(false); // Only stop loading if it fails
        }
        // Remove setLoading(false) from finally, or it might flicker
    };

    return (
        <DeleteStudentView 
            studentName={student.name}
            onConfirm={handleDelete}
            onClose={onClose}
            loading={loading}
            success={success}
        />
    );
};

export default DeleteStudent;