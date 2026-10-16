/*
 * VARIABLE DECLARATIONS DEMO: const vs let vs var
 *
 * - const : the binding can never be reassigned. Used for most values.
 * - let   : block-scoped, CAN be reassigned. Used for counters / loop values.
 * - var   : the OLD way. It is FUNCTION-scoped (it ignores { } blocks) and is
 *           "hoisted". This is why modern code avoids it. It appears ONCE
 *           here, purely as a teaching example.
 */

/**
 * Counts how many students are enrolled.
 * Used in the Header to show the "Enrolled" statistic.
 * @param {Array<Object>} students - the student array
 * @returns {number} number of enrolled students
 */
export function countEnrolledWithLoop(students) {
  // let: `count` changes on every matching loop iteration, so it can't be const.
  let count = 0;

  for (let i = 0; i < students.length; i++) {
    // const: `student` is a fresh binding each iteration and is never reassigned.
    const student = students[i];
    if (student.enrolled === true) {
      count = count + 1;
    }
  }

  // --- var DEMO (function scope) -------------------------------------------
  if (students.length >= 0) {
    // `lastChecked` is declared INSIDE this if-block...
    var lastChecked = students.length;
  }
  // ...yet it is still accessible OUTSIDE the block, because var is scoped to
  // the whole function, not the block. With let/const this line would throw a
  // ReferenceError. We only use it to prove the loop looked at every record.
  if (lastChecked !== students.length) {
    console.warn('Unexpected: not every student was checked.');
  }
  // -------------------------------------------------------------------------

  return count;
}
