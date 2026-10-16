// NON-PRIMITIVE TYPES: an ARRAY of OBJECTS.
// Each object is one student record. Notice the PRIMITIVE types inside:
//   id, fullName, email, course -> string
//   age                         -> number (no quotes, so maths/comparisons work)
//   enrolled                    -> boolean (true / false, not "yes"/"no")
// `const` is used because this sample list is never reassigned.
export const initialStudents = [
  { id: 'STU-001', fullName: 'Thabo Mokoena', age: 20, email: 'thabo.mokoena@uni.ac.za', course: 'Computer Science', enrolled: true },
  { id: 'STU-002', fullName: 'Lerato Nkosi', age: 22, email: 'lerato.nkosi@uni.ac.za', course: 'Information Systems', enrolled: true },
  { id: 'STU-003', fullName: 'James Smith', age: 19, email: 'james.smith@uni.ac.za', course: 'Software Engineering', enrolled: false },
  { id: 'STU-004', fullName: 'Aisha Patel', age: 24, email: 'aisha.patel@uni.ac.za', course: 'Data Science', enrolled: true },
  { id: 'STU-005', fullName: 'Pieter van Wyk', age: 27, email: 'pieter.vanwyk@uni.ac.za', course: 'Cyber Security', enrolled: false },
  { id: 'STU-006', fullName: 'Naledi Dube', age: 18, email: 'naledi.dube@uni.ac.za', course: 'Computer Science', enrolled: true },
];

// The list of courses for the <select> dropdown (array of strings).
export const COURSES = [
  'Computer Science',
  'Information Systems',
  'Software Engineering',
  'Data Science',
  'Cyber Security',
];
