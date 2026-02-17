import React from 'react';

const AddStudentView = ({ formData, onChange, onSubmit, onClose,loading}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">Add New Student</h2>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={onSubmit} className="modal-form">
                    <div className="form-field">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={onChange} 
                            placeholder="Enter full name" 
                            required 
                        />
                    </div>

                    <div className="form-field">
                        <label>Student ID</label>
                        <input 
                            type="text" 
                            name="studentId" 
                            value={formData.studentId} 
                            onChange={onChange} 
                            placeholder="e.g. STU-2026-001" 
                            required 
                        />
                    </div>

                    <div className="form-field">
                        <label>Grade / Level</label>
                        <input 
                            type="text" 
                            name="grade" 
                            value={formData.grade} 
                            onChange={onChange} 
                            placeholder="e.g. Grade 10" 
                            required 
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? <span className="spinner"></span> : "Save Student"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentView;