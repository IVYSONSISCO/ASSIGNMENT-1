/*
 * Reusable helper functions for creating, editing, deleting and displaying
 * student records. They are PURE: they take data in and RETURN new data,
 * and never mutate the original array. React needs a NEW array to know that
 * state has changed and re-render.
 */

/**
 * Generates the next ID such as "STU-007".
 * Uses reduce to find the highest existing number, so IDs stay unique even
 * after deletions.
 * @param {Array<Object>} students
 * @returns {string}
 */
export function generateStudentId(students) {
  const highest = students.reduce((max, s) => {
    const num = parseInt(s.id.replace('STU-', ''), 10); // "STU-004" -> 4
    return num > max ? num : max; // ternary
  }, 0);
  return `STU-${String(highest + 1).padStart(3, '0')}`;
}

/**
 * Converts raw form values (all strings from inputs) into a correctly typed
 * student object. This is where age becomes a real Number.
 */
export const toStudentObject = (formValues, id) => ({
  id: id,
  fullName: formValues.fullName.trim(),
  age: Number(formValues.age),          // string -> number
  email: formValues.email.trim().toLowerCase(),
  course: formValues.course,
  enrolled: formValues.enrolled === true, // guarantee a boolean
});

/** ADD: returns a new array with the student appended. */
export const addStudent = (students, formValues) => {
  const newStudent = toStudentObject(formValues, generateStudentId(students));
  return [...students, newStudent];
};

/** EDIT: map returns a new array, replacing only the matching record. */
export const updateStudent = (students, id, formValues) =>
  students.map((s) => (s.id === id ? toStudentObject(formValues, id) : s));

/** DELETE: filter keeps every student except the one with this id. */
export const deleteStudent = (students, id) =>
  students.filter((s) => s.id !== id);

/** FIND: returns the matching student object, or undefined. */
export const findStudentById = (students, id) =>
  students.find((s) => s.id === id);

/** DISPLAY: converts the boolean into readable text for the status badge. */
export const getStatusLabel = (enrolled) =>
  enrolled ? 'Enrolled' : 'Not Enrolled';

/**
 * SEARCH + FILTER for the dashboard.
 * @param {Array<Object>} students
 * @param {string} searchTerm - text typed into the search box
 * @param {string} statusFilter - "all" | "enrolled" | "not-enrolled"
 * @returns {Array<Object>} filtered list
 */
export function filterStudents(students, searchTerm, statusFilter) {
  const term = searchTerm.trim().toLowerCase();

  return students.filter((s) => {
    const matchesName = s.fullName.toLowerCase().includes(term);

    let matchesStatus;
    if (statusFilter === 'enrolled') {
      matchesStatus = s.enrolled === true;
    } else if (statusFilter === 'not-enrolled') {
      matchesStatus = s.enrolled === false;
    } else {
      matchesStatus = true; // "all"
    }

    return matchesName && matchesStatus;
  });
}
