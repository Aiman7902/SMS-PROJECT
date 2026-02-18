import { X } from 'lucide-react';

const EditStudentView = ({ formData, onChange, onSubmit, loading, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Student</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="form-input"
                required
              />
            </div>

            {/* Student ID */}
            <div className="form-group">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={onChange}
                className="form-input"
                required
              />
            </div>

            {/* Grade */}
            <div className="form-group">
              <label className="form-label">Grade</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={onChange}
                className="form-input"
                required
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="form-input"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentView;