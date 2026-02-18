import { useState } from 'react';
import AddStudentView from './add-student.view';
import Toast from '../../Toast/Toast';
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
    const [toast, setToast] = useState(null); // { message, type }

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
                apiClient(API_ENDPOINTS.STUDENTS.CREATE, {
                    method: 'POST',
                    body: formData  
                }),
                new Promise(resolve => setTimeout(resolve, 1500))
            ]);

            setToast({ message: 'Student created successfully!', type: 'success' });
            setTimeout(() => {
                onRefresh();
                onClose();
            }, 1000); // Give user time to see success toast
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to save student';
            setToast({ message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AddStudentView 
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

export default AddStudent;