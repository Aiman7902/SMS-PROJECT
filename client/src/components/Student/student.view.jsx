import { useState, useRef, useEffect } from 'react';
import { Search, SquareDashedBottomCode, Pencil, Trash2 } from 'lucide-react';

const ActionDropdown = ({ student, onEditClick, onDeleteClick }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    // Close on scroll so dropdown doesn't float away
    const handleScroll = () => setOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true); // true = capture all scroll events
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setOpen(prev => !prev);
  };

  return (
    <div className="action-dropdown-wrapper" ref={btnRef}>
      <button
        className="action-trigger-btn"
        onClick={handleOpen}
        aria-label="Actions"
      >
        <SquareDashedBottomCode size={18} />
      </button>

      {open && (
        <div
          className="action-dropdown"
          style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
        >
          <ul>
            <li>
              <button
                className="action-dropdown-item"
                onClick={() => { onEditClick(student); setOpen(false); }}
              >
                <Pencil size={14} /> Edit
              </button>
            </li>
            <li>
              <button
                className="action-dropdown-item action-dropdown-item--danger"
                onClick={() => { onDeleteClick(student); setOpen(false); }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const StudentView = ({ students, loading, searchTerm, setSearchTerm, onAddClick, onDeleteClick, onEditClick }) => {
  return (
    <div className="page-wrapper">
      <div className="module-header">
        <div>
          <h1 className="module-title">Students</h1>
          <p className="module-subtitle">Manage and view all registered students</p>
        </div>
        <button className="btn-add" onClick={onAddClick}>
          + Add Student
        </button>
      </div>

      <div className="content-container">
        <div className="filter-section">
          <div className="search-wrapper">
            <span className="search-icon"><Search size={16} /></span>
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Grade</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10">Loading...</td></tr>
              ) : students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <ActionDropdown
                      student={student}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
                    />
                  </td>
                  <td className="font-medium">{student.studentId}</td>
                  <td className="font-semibold">{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.class?.className || 'Unassigned'}</td>
                  <td>
                    <span className={`badge ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
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