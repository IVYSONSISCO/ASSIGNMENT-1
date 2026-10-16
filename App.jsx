import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import StudentTable from './components/StudentTable.jsx';
import StudentFormModal from './components/StudentFormModal.jsx';
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx';
import EmptyState from './components/EmptyState.jsx';
import { initialStudents } from './data/initialStudents.js';
import {
  addStudent,
  updateStudent,
  deleteStudent,
  findStudentById,
  filterStudents,
} from './utils/studentHelpers.js';
import './styles/app.css';

// const: the localStorage key never changes.
const STORAGE_KEY = 'sms-students';

/*
 * App is the "single source of truth". All shared state lives here (lifting
 * state up) and is passed DOWN to child components via props. Children report
 * actions back UP by calling handler functions passed as props.
 */
function App() {
  // ---- STATE --------------------------------------------------------------
  const [students, setStudents] = useState(initialStudents); // array of objects
  const [hasLoaded, setHasLoaded] = useState(false);         // boolean
  // modalMode: null (closed) | "add" | "edit" | "delete"
  const [modalMode, setModalMode] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // object | null
  const [searchTerm, setSearchTerm] = useState('');            // string
  const [statusFilter, setStatusFilter] = useState('all');     // string

  // ---- LOAD from localStorage (runs once, on first render) ---------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setStudents(JSON.parse(saved)); // JSON text -> array of objects
      }
    } catch (error) {
      // Corrupted data: fall back to the sample students instead of crashing.
      console.error('Could not load saved students:', error);
    }
    setHasLoaded(true);
  }, []);

  // ---- SAVE to localStorage (runs every time `students` changes) ---------
  useEffect(() => {
    // Wait until loading finished, otherwise we would overwrite saved data
    // with the sample data on the very first render.
    if (hasLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students, hasLoaded]);

  // ---- MODAL HANDLERS -----------------------------------------------------
  const openAddModal = () => {
    setSelectedStudent(null);
    setModalMode('add');
  };

  const openEditModal = (id) => {
    setSelectedStudent(findStudentById(students, id));
    setModalMode('edit');
  };

  const openDeleteModal = (id) => {
    setSelectedStudent(findStudentById(students, id));
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedStudent(null);
  };

  // ---- CRUD HANDLERS (each creates a NEW array -> React re-renders) -------
  const handleSaveStudent = (formValues) => {
    if (modalMode === 'edit' && selectedStudent) {
      setStudents((prev) => updateStudent(prev, selectedStudent.id, formValues));
    } else {
      setStudents((prev) => addStudent(prev, formValues));
    }
    closeModal();
  };

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      setStudents((prev) => deleteStudent(prev, selectedStudent.id));
    }
    closeModal();
  };

  // Derived data: calculated on every render, NOT stored in state, so it can
  // never get out of sync with `students`.
  const visibleStudents = filterStudents(students, searchTerm, statusFilter);

  return (
    <div className="app">
      <Header students={students} onAddClick={openAddModal} />

      <main className="container">
        <section className="toolbar" aria-label="Search and filter students">
          <div className="field-inline">
            <label htmlFor="search">Search by name</label>
            <input
              id="search"
              type="search"
              placeholder="e.g. Thabo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="field-inline">
            <label htmlFor="status-filter">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All students</option>
              <option value="enrolled">Enrolled</option>
              <option value="not-enrolled">Not Enrolled</option>
            </select>
          </div>
        </section>

        {/* Conditional rendering with a ternary */}
        {students.length === 0 ? (
          <EmptyState
            title="No students yet"
            message="Click “Add Student” to create your first record."
            onAddClick={openAddModal}
          />
        ) : visibleStudents.length === 0 ? (
          <EmptyState
            title="No matches"
            message="No students match your search or filter. Try something else."
          />
        ) : (
          <StudentTable
            students={visibleStudents}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        )}
      </main>

      {/* One shared form modal for both Add and Edit */}
      <StudentFormModal
        isOpen={modalMode === 'add' || modalMode === 'edit'}
        mode={modalMode}
        student={selectedStudent}
        students={students}
        onSave={handleSaveStudent}
        onClose={closeModal}
      />

      <DeleteConfirmModal
        isOpen={modalMode === 'delete'}
        student={selectedStudent}
        onConfirm={handleConfirmDelete}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
