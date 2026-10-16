import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import { COURSES } from '../data/initialStudents.js';
import { validateField, validateStudent, isValid } from '../utils/validation.js';

// An empty form (object). Inputs always hold strings, except the checkbox.
const EMPTY_FORM = { fullName: '', age: '', email: '', course: '', enrolled: true };

/**
 * Shared form for BOTH adding and editing.
 *  - mode "add"  -> starts empty
 *  - mode "edit" -> pre-filled with `student`
 * Uses CONTROLLED inputs: React state is the single source of each value.
 */
function StudentFormModal({ isOpen, mode, student, students, onSave, onClose }) {
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = mode === 'edit';
  const editingId = isEdit && student ? student.id : null;

  // Reset the form every time the modal opens (or the student changes), so
  // old values/errors never leak between Add and Edit.
  useEffect(() => {
    if (!isOpen) return;
    if (isEdit && student) {
      setFormValues({
        fullName: student.fullName,
        age: String(student.age), // number -> string for the input
        email: student.email,
        course: student.course,
        enrolled: student.enrolled,
      });
    } else {
      setFormValues(EMPTY_FORM);
    }
    setErrors({});
  }, [isOpen, isEdit, student]);

  // One handler for all inputs: uses the input's `name` to update the field.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    const updated = { ...formValues, [name]: newValue };
    setFormValues(updated);

    // Clear (or update) the error for this field as the user fixes it.
    if (errors[name]) {
      const message = validateField(name, updated, students, editingId);
      setErrors((prev) => {
        const next = { ...prev };
        if (message) next[name] = message;
        else delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the browser reloading the page
    const foundErrors = validateStudent(formValues, students, editingId);
    setErrors(foundErrors);
    if (isValid(foundErrors)) {
      onSave(formValues); // App converts and stores it
    }
  };

  // Closing also resets, so reopening always starts fresh.
  const handleClose = () => {
    setFormValues(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  // Helper returning the aria props for a field with a possible error.
  const errorProps = (field) => ({
    'aria-invalid': errors[field] ? 'true' : 'false',
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  return (
    <Modal isOpen={isOpen} title={isEdit ? 'Edit student' : 'Add student'} onClose={handleClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" name="fullName" type="text" value={formValues.fullName}
            onChange={handleChange} {...errorProps('fullName')} />
          {errors.fullName && <p id="fullName-error" className="error">{errors.fullName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input id="age" name="age" type="number" min="16" max="100" step="1" value={formValues.age}
            onChange={handleChange} {...errorProps('age')} />
          {errors.age && <p id="age-error" className="error">{errors.age}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formValues.email}
            onChange={handleChange} {...errorProps('email')} />
          {errors.email && <p id="email-error" className="error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={formValues.course}
            onChange={handleChange} {...errorProps('course')}>
            <option value="">-- Select a course --</option>
            {COURSES.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <p id="course-error" className="error">{errors.course}</p>}
        </div>

        <div className="form-field checkbox-field">
          <input id="enrolled" name="enrolled" type="checkbox" checked={formValues.enrolled}
            onChange={handleChange} />
          <label htmlFor="enrolled">Currently enrolled</label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn" onClick={handleClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{isEdit ? 'Save Changes' : 'Add Student'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default StudentFormModal;
