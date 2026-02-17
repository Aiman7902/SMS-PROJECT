import React from 'react';

const DeleteStudentView = ({ studentName, onConfirm, onClose, loading, success }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container delete-variant">
                {success ? (
                    <div className="modal-body success-animation">
                        <div className="success-icon">✅</div>
                        <h2 className="text-xl font-bold text-slate-800">Successfully Deleted!</h2>
                        <p className="text-slate-600 mt-2"><strong>{studentName}</strong> has been removed.</p>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title">Delete Student</h2>
                        </div>
                        <div className="modal-body">
                            <div className="warning-icon">⚠️</div>
                            <p>Are you sure you want to delete <strong>{studentName}</strong>?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
                            <button className="btn-delete" onClick={onConfirm} disabled={loading}>
                                {loading ? <span className="spinner"></span> : "Confirm Delete"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeleteStudentView;