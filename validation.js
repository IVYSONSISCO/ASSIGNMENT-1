/*
 * Form validation. Returns an OBJECT of error messages, keyed by field name.
 * An empty object {} means the form is valid.
 */

// const: a regular expression that never changes. Checks "text@text.text".
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single field. Used both on submit and while typing, so errors
 * clear as soon as the user fixes them.
 * @param {string} name - field name
 * @param {Object} data - all form values
 * @param {Array<Object>} students - existing students (for duplicate email)
 * @param {string|null} editingId - id being edited, so a student's own email
 *                                  is not reported as a duplicate
 * @returns {string} error message, or "" if valid
 */
export function validateField(name, data, students, editingId) {
  if (name === 'fullName') {
    const value = data.fullName.trim();
    if (value === '') return 'Full name is required.';
    if (value.length < 2) return 'Full name must be at least 2 characters.';
    return '';
  }

  if (name === 'age') {
    if (String(data.age).trim() === '') return 'Age is required.';
    const age = Number(data.age); // inputs give strings, convert to number
    if (!Number.isInteger(age)) return 'Age must be a whole number.';
    if (age < 16 || age > 100) return 'Age must be between 16 and 100.';
    return '';
  }

  if (name === 'email') {
    const value = data.email.trim().toLowerCase();
    if (value === '') return 'Email is required.';
    if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address (e.g. name@uni.ac.za).';
    // some: true if ANY other student already has this email
    const taken = students.some((s) => s.email.toLowerCase() === value && s.id !== editingId);
    if (taken) return 'This email is already used by another student.';
    return '';
  }

  if (name === 'course') {
    return data.course === '' ? 'Please select a course.' : '';
  }

  return ''; // e.g. "enrolled" checkbox cannot be invalid
}

/**
 * Validates the whole form.
 * @returns {Object} e.g. { age: "Age is required." } — empty if valid.
 */
export function validateStudent(data, students, editingId) {
  const fields = ['fullName', 'age', 'email', 'course'];
  const errors = {};
  fields.forEach((field) => {
    const message = validateField(field, data, students, editingId);
    if (message) errors[field] = message;
  });
  return errors;
}

/** Arrow function: true when the errors object has no keys. */
export const isValid = (errors) => Object.keys(errors).length === 0;
