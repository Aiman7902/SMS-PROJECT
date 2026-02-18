import { useState, useEffect } from 'react';
import EditStudentView from './edit-student.view';
import Toast from '../../Toast/Toast';
import { API_ENDPOINTS } from '../../../utils/constants';
import { apiClient } from '../../../utils/api-client';
import './edit-student.css';

const EditStudent = ({ student, onRefresh, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        grade: '',
        status: 'ACTIVE'
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Pre-fill form with student data
    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                studentId: student.studentId,
                grade: student.grade,
                status: student.status.toUpperCase()
            });
        }
    }, [student]);

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
            await Promise.all([
                apiClient(`${API_ENDPOINTS.STUDENTS.LIST}/${student.id}`, {
                    method: 'PUT',
                    body: formData
                }),
                new Promise(resolve => setTimeout(resolve, 1500))
            ]);

            setToast({ message: 'Student updated successfully!', type: 'success' });
            setTimeout(() => {
                onRefresh();
                onClose();
            }, 1000);
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update student';
            setToast({ message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <EditStudentView
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                onClose={onClose}
            />
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default EditStudent;