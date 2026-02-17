import React from 'react';
import { Search } from 'lucide-react';

const StudentView = ({ students, loading, searchTerm, setSearchTerm, onAddClick,onDeleteClick }) => {
  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="module-header">
        <div>
          <h1 className="module-title">Students</h1>
          <p className="module-subtitle">Manage and view all registered students</p>
        </div>
        <button className="btn-add" onClick={onAddClick}>
            + Add Student
        </button>
      </div>

      {/* Main Container */}
      <div className="content-container">
        {/* Search/Filter Bar */}
        <div className="filter-section">
          <div className="search-wrapper">
            <span className="search-icon"><Search /></span>
            <input 
              type="text" 
              placeholder="Search by name or student ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Grade</th>
                <th>Class</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
                <tbody>
                {loading ? (
                    <tr><td colSpan="6" className="text-center py-10">Loading...</td></tr>
                ) : students.map((student) => (
                    <tr key={student.id}>
                    <td className="font-medium text-slate-600">{student.studentId}</td>
                    <td className="font-semibold text-slate-900">{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.class?.className || 'Unassigned'}</td>
                    <td>
                        <span className={`badge ${student.status.toLowerCase()}`}>
                        {student.status}
                        </span>
                    </td>
                    {/* Action Buttons Column */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                        <button className="btn-edit">Edit</button>
                        <button className="btn-delete" onClick={() => onDeleteClick(student)}>Delete</button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentView;